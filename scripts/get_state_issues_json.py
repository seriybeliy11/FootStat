import requests

# Замените owner и repo на соответствующие значения
owner = "ton-society"
repo = "grants-and-bounties"

# Эндпоинт для получения списка задач
url = f"https://api.github.com/repos/{owner}/{repo}/issues"

try:
    response = requests.get(url)
    response.raise_for_status()  # Проверка наличия ошибок в ответе

    issues_data = response.json()

    # Словарь для хранения данных о состоянии задач
    state_data = {"state": []}

    # Счетчики для закрытых и открытых задач
    closed_count = 0
    open_count = 0

    for issue in issues_data:
        if issue["state"] == "closed":
            closed_count += 1
        elif issue["state"] == "open":
            open_count += 1

    # Добавление данных о закрытых задачах
    state_data["state"].append({"state": "closed", "value": closed_count})

    # Добавление данных об открытых задачах
    state_data["state"].append({"state": "open", "value": open_count})

    # Вывод данных в формате JSON
    print(state_data)

except requests.exceptions.RequestException as e:
    print(f"Произошла ошибка при запросе данных: {e}")
except ValueError as ve:
    print(f"Произошла ошибка при обработке JSON-данных: {ve}")
