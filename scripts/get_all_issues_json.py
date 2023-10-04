import requests
import datetime

# Замените owner и repo на соответствующие значения
owner = "ton-society"
repo = "grants-and-bounties"

# JSON данные с датами
dates_data = [
    "2022-06-13 09:39:52+00:00",
    "2022-08-13 09:39:52+00:00",
    "2022-10-13 09:39:52+00:00",
    "2022-12-13 09:39:52+00:00",
    "2023-02-01 00:00:00+00:00",
    "2023-04-01 00:00:00+00:00",
    "2023-06-01 00:00:00+00:00"
]

# Словарь для хранения данных о количестве задач по датам
all_issues_data = {}

for date in dates_data:
    url = f"https://api.github.com/repos/{owner}/{repo}/issues?since={date}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Проверка наличия ошибок в ответе

        issues_data = response.json()

        # Получение общего количества задач
        all_issues_count = len(issues_data)

        # Преобразование даты в формат YYYY-MM-DD
        formatted_date = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S%z").strftime("%Y-%m-%d %H:%M:%S%z")

        # Добавление данных в словарь
        all_issues_data[formatted_date] = all_issues_count

    except requests.exceptions.RequestException as e:
        print(f"Произошла ошибка при запросе данных: {e}")
    except ValueError as ve:
        print(f"Произошла ошибка при обработке JSON-данных: {ve}")

# Преобразование данных в желаемый формат
formatted_data = [{"Dates": date, "All Issues": str(count)} for date, count in all_issues_data.items()]

# Вывод данных в формате JSON
print(formatted_data)
