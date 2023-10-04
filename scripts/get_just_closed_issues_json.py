import requests
import datetime

# Замените owner и repo на соответствующие значения
owner = "ton-society"
repo = "grants-and-bounties"

# JSON данные с датами
dates_data = [
    "2022-06-13T09:39:52Z",
    "2022-08-13T09:39:52Z",
    "2022-10-13T09:39:52Z",
    "2022-12-13T09:39:52Z",
    "2023-02-01T00:00:00Z",
    "2023-04-01T00:00:00Z",
    "2023-06-01T00:00:00Z"
]

# Словарь для хранения данных о закрытых задачах по датам
closed_issues_data = {}

for date in dates_data:
    url = f"https://api.github.com/repos/{owner}/{repo}/issues?since={date}&state=closed"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Проверка наличия ошибок в ответе

        issues_data = response.json()

        # Получение количества закрытых задач
        closed_issues_count = len(issues_data)

        # Преобразование даты в формат YYYY-MM-DD
        formatted_date = datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d")

        # Добавление данных в словарь
        closed_issues_data[formatted_date] = closed_issues_count

    except requests.exceptions.RequestException as e:
        print(f"Произошла ошибка при запросе данных: {e}")
    except ValueError as ve:
        print(f"Произошла ошибка при обработке JSON-данных: {ve}")

# Преобразование данных в желаемый формат
formatted_data = [{"Date": date, "Closed Issues": str(count)} for date, count in closed_issues_data.items()]

# Вывод данных в формате JSON
print(formatted_data)
