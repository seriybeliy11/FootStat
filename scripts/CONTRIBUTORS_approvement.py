import requests
import json
from plate import token 

# Replace 'YOUR_GITHUB_TOKEN' with your actual GitHub token
github_token = token

def get_contributors(repo):
    url = f'https://api.github.com/repos/{repo}/contributors'
    headers = {'Authorization': f'token {github_token}'}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        contributors = response.json()
        return contributors
    else:
        print(f"Failed to retrieve contributors. Status code: {response.status_code}")
        return []

def format_contributors(contributors):
    formatted_contributors = []

    for contributor in contributors:
        login = contributor.get('login')
        contributions = contributor.get('contributions', 0)
        formatted_contributors.append({"login": login, "contributions": float(contributions)})

    return formatted_contributors

def main():
    repo = 'ton-society/grants-and-bounties'

    # Get contributors
    contributors = get_contributors(repo)

    if contributors:
        # Format contributor data
        formatted_contributors = format_contributors(contributors)

        # Convert to the desired format
        result_json = json.dumps(formatted_contributors, indent=2, ensure_ascii=False)

        # Write to JSON file
        with open('data_contributors.json', 'w') as json_file:
            json_file.write(result_json)
    else:
        print("No contributors found.")

if __name__ == '__main__':
    main()
