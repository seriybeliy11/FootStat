import requests
import json
from plate import access_token
import time

def get_commentators(issue_url, headers):
    response = requests.get(issue_url + "/comments", headers=headers)
    if response.status_code == 200:
        comments = response.json()
        commentators = set()
        for comment in comments:
            commentators.add(comment["user"]["login"])
        return commentators
    else:
        return None

repo_url = "ttps://api.github.com/repos/ton-society/grants-and-bounties"
issues_endpoint = "/issues"
token = access_token

headers = {
    "Authorization": f"Bearer {token}"
}

per_page = 100
params = {
    "per_page": per_page
}

data = []

while True:
    response = requests.get(repo_url + issues_endpoint, headers=headers, params=params)
    time.sleep(5)

    if response.status_code == 200:
        issues = response.json()
        if len(issues) == 0:
            break

        for issue in issues:
            issue_number = issue["number"]
            issue_url = issue["url"]

            while True:
                commentators = get_commentators(issue_url, headers)
                if commentators is not None:
                    break

            num_commentators = len(commentators)
            data.append({"issue": issue_number, "Que": num_commentators})

        if "Link" in response.headers:
            links = response.headers["Link"].split(",")
            next_page = None
            for link in links:
                link_parts = link.split(";")
                if "rel=\"next\"" in link_parts[1]:
                    next_page = link_parts[0].strip("<> ")
                    break

            if next_page is None:
                break

            params["page"] = int(next_page.split("=")[1])

    else:
        print("Failed to retrieve issues", response.status_code)
        break

json_data = json.dumps(data, indent=2)
print(json_data)
