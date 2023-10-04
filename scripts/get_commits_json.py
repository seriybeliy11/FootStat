import requests

# Замените owner и repo на соответствующие значения
owner = "ton-society"
repo = "grants-and-bounties"

url = f"https://api.github.com/repos/{owner}/{repo}/commits"

try:
    response = requests.get(url)
    response.raise_for_status()  # Проверка наличия ошибок в ответе

    commits_data = response.json()

    contributors_data = {}
    for commit in commits_data:
        contributor_name = commit["commit"]["author"]["name"]
        contributor_date = commit["commit"]["author"]["date"]

        if contributor_name not in contributors_data:
            contributors_data[contributor_name] = []

        contributors_data[contributor_name].append({
            "name": contributor_name,
            "date": contributor_date,
            "additions": str(commit["stats"]["additions"]),
            "deletions": str(commit["stats"]["deletions"]),
            "commits": "1"  # Мы считаем каждый коммит как 1 коммит
        })

    # Преобразование данных в список для вывода
    user_data = [data for contributor_data in contributors_data.values() for data in contributor_data]

    # Вывод данных в формате JSON
    print(user_data)

except requests.exceptions.RequestException as e:
    print(f"Произошла ошибка при запросе данных: {e}")
except ValueError as ve:
    print(f"Произошла ошибка при обработке JSON-данных: {ve}")
