import requests

# URL API GitHub для контрибьюторов репозитория
url = "https://api.github.com/repos/ton-society/grants-and-bounties/contributors"

try:
    response = requests.get(url)
    response.raise_for_status()  # Проверка наличия ошибок в ответе

    # Преобразование ответа в список словарей
    contributors_data = response.json()

    # Преобразование данных в желаемый формат
    formatted_data = [{"login": contributor["login"], "contributions": contributor["contributions"]} for contributor in contributors_data]

    # Вывод данных в формате JSON
    print(formatted_data)

except requests.exceptions.RequestException as e:
    print(f"Произошла ошибка при запросе данных: {e}")
except ValueError as ve:
    print(f"Произошла ошибка при обработке JSON-данных: {ve}")
