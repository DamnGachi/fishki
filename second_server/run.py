
import json

from fastapi import FastAPI, HTTPException
from crud.parser_kadastr import get_info
from crud.google_event import create_event_handler
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.post("/create_event/")
# example: datetime "2023-08-28T09:00:00-07:00"
async def create_event(title: str, description: str, location: str, start_date: str, end_date: str):
    try:
        return create_event_handler(title, description, location, start_date, end_date)
    except KeyError:
        raise HTTPException(
            status_code=403, detail=f'Forbidden')


@app.get('/api/parser/{kadastr_number}')
async def get_data_kadastr(kadastr_number: str):
    try:
        get_info(kadastr_number)
        with open("info_from_reestr.json", "r", encoding='utf-8') as json_file:
            data = json.load(json_file)
        return data

    except KeyError:
        raise HTTPException(
            status_code=404, detail=f'Кадастровый номер не найден')
