import requests
import json

def get_issues_count(repo, state='open', page=1):
    url = f'https://api.github.com/repos/{repo}/issues'
    params = {'state': state, 'page': page}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        issues = response.json()
        return len(issues)
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        return 0

def get_total_count(repo, state='all'):
    total_count = 0
    page = 1

    while True:
        count = get_issues_count(repo, state=state, page=page)
        if count == 0:
            break
        total_count += count
        page += 1

    return total_count

def main():
    repo = 'ton-society/grants-and-bounties'

    closed_count = get_total_count(repo, state='closed')
    open_count = get_total_count(repo, state='open')

    result_json = {
            "state": [
                {"state": "closed", "value": closed_count},
                {"state": "open", "value": open_count}
            ]
        }

    result_json_str = json.dumps(result_json, indent=2, ensure_ascii=False)

    with open('github_issues.json', 'w') as file:
        file.write(result_json_str)

if __name__ == '__main__':
    main()
