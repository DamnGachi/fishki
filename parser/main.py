import os
import lxml
import json
import requests
from bs4 import BeautifulSoup


def get_info(kadastr_number: str):

    header = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'}
    result1 = []
    result2 = []

    # kadastr_number = "67:18:0054501:44"
    url = f"https://kadastrmap.com/reestr/{kadastr_number.replace(':','-')}/"

    response = requests.get(url, headers=header
                            )

    # Make an HTTP request to the website
    if not os.path.exists("data"):
        os.mkdir("data")

    with open("data/info_page.html", "w", encoding='utf-8') as file:
        file.write(response.text)

    with open("data/info_page.html", encoding='utf-8') as file:
        src = file.read()

    soup = BeautifulSoup(src, "lxml")
    info = soup.find('div', id='cn-container-info').find_all("tr")

    concret_info = soup.find_all('td')

    for item in concret_info:
        item_info = item.find('strong')
        if item_info is not None:
            result1.append(str(item_info.string))

    for item in info:
        item_info = item.find('td')
        result2.append(item_info.string)

    dick = dict(zip(result2, result1))
    with open("dick.json", 'w', encoding='utf-8') as fout:
        json_dumps_str = json.dumps(dick, ensure_ascii=False)
        print(json_dumps_str, file=fout)

    with open("dick.json", 'r', encoding='utf-8') as fout:
        return fout.read()
