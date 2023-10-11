import requests
from plate import token
import json

# GitHub REST API endpoint for repository issues
url_issues = "https://api.github.com/repos/ton-society/grants-and-bounties/issues"

headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github.v3+json"
}

def get_all_issues(url, params):
    all_data = []
    per_page = params.get("per_page", 30)  # Adjust the per_page value as needed
    page = 1

    while True:
        params["page"] = page
        params["per_page"] = per_page

        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            print(f"Failed to fetch data. Status code: {response.status_code}")
            break

        data = response.json()
        all_data.extend(data)

        # Check if there are more items
        if len(data) < per_page:
            break

        page += 1

    return all_data

# GitHub REST API query parameters for all issues
params_all = {
    "state": "closed", # Include both open and closed issues
    "per_page": 100   # Adjust the per_page value as needed
}

# Get all issues
all_issues = get_all_issues(url_issues, params_all)

# Filter issues based on created_at for 2022 and 2023
count_2022 = sum(1 for issue in all_issues if issue.get("created_at", "").startswith("2022"))
count_2023 = sum(1 for issue in all_issues if issue.get("created_at", "").startswith("2023"))

data = [
    {"Dates": "2022", "Closed Issues": int(count_2022)},
    {"Dates": "2023", "Closed Issues": int(count_2023)}
]

# Конвертируем в JSON
json_data = json.dumps(data, indent=2)

# Записываем JSON в файл
with open('github_just_closed_issues.json', 'w') as json_file:
    json_file.write(json_data)
