import threading
import queue
import subprocess
import importlib
import time
import platform
import schedule
import random

# Функция, которая выполняет парсер
def run_parser(parser_module, parser_description):
    while True:
        item = work_queue.get()
        if item is None:
            # Завершение работы потока при получении None
            break

        try:
            print(f"Запуск {parser_description}: элемент {item}")
            # Импортирование и запуск парсера
            parser = importlib.import_module(parser_module.__name__)
            start_time = time.time()
            parser.parse(item)
            end_time = time.time()
            execution_time = end_time - start_time
            print(f"{parser_description} выполнился за {execution_time:.2f} секунд")

            # Генерация случайной задержки между выполнениями парсеров (например, от 5 до 15 минут)
            delay_minutes = random.randint(5, 15)
            print(f"Пауза {parser_description} на {delay_minutes} минут")
            time.sleep(delay_minutes * 60)

        except Exception as e:
            print(f"Ошибка в {parser_description}: {str(e)}")
            print(f"Перезапуск {parser_description} через 10 минут")
            time.sleep(10 * 60)  # Пауза перед повторным запуском

        work_queue.task_done()

# Создание очереди задач
work_queue = queue.Queue()

# Заполнение очереди задачами
for i in range(7):
    work_queue.put(i)

# Список модулей с парсерами и их описанием
parser_info = [
    ("parser1", "Парсер 1"),
    ("parser2", "Парсер 2"),
    ("parser3", "Парсер 3"),
    ("parser4", "Парсер 4"),
    ("parser5", "Парсер 5"),
    ("parser6", "Парсер 6"),
    ("parser7", "Парсер 7"),
]

# Создание потоков для выполнения парсеров
parser_threads = []
for parser_module, parser_description in parser_info:
    thread = threading.Thread(target=run_parser, args=(parser_module, parser_description))
    parser_threads.append(thread)

# Функция для планирования выполнения парсеров
def schedule_parsers():
    for thread in parser_threads:
        if not thread.is_alive():
            thread.start()

# Определение расписания выполнения парсеров
schedule.every(12).hours.do(schedule_parsers)  # Запуск каждые 12 часов

# Ожидание завершения всех потоков
for thread in parser_threads:
    thread.join()

# Завершение работы потоков
for _ in range(7):
    work_queue.put(None)

# Ожидание завершения очереди
work_queue.join()

# После завершения всех парсеров, запуск сайта
if platform.system() == "Windows":
    # Для Windows, используйте start команду для открытия npm run dev в новом окне
    subprocess.Popen(["start", "cmd", "/k", "npm run dev"], shell=True)
else:
    # Для macOS и Linux, используйте x-terminal-emulator для открытия npm run dev
    subprocess.Popen(["x-terminal-emulator", "-e", "npm run dev"])

while True:
    schedule.run_pending()
    time.sleep(1)
