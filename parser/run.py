
from datetime import timedelta
import datetime
import json
from typing import Dict, List
import uuid
from fastapi import FastAPI, HTTPException, Request
from parser_kadastr import get_info
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json'
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
calendar_service = build("calendar", "v3", credentials=credentials)


@app.post("/create_event/")
#  start_date: str, end_date: str,
async def create_event(title: str, description: str, location: str,):

    event = {
        "summary": title,
        "location": location,
        "description": description,
        "start": {
            "dateTime": "2023-08-28T09:00:00-07:00",
            "timeZone": "America/Los_Angeles",
        },
        "end": {
            "dateTime": "2023-08-28T22:00:00-07:00",
            "timeZone": "America/Los_Angeles",
        },
        # "attendees": [
        #     {
        #         "email": "john@example.com"
        #     },
        #     {
        #         "email": "jane@example.com"
        #     }
        # ],
        "conferenceData": {
            "createRequest": {
                "requestId": f"{uuid.uuid4().hex}",
                "conferenceSolution": {
                    "key": {
                        "type": "hangoutsMeet"
                    }
                },
                "conferenceName": "Test Meeting",
                "conferenceEntryPoints": [
                    {
                        "entryPointType": "video",
                        "uri": "https://meet.google.com/abc-defg-hij"
                    }
                ]

            }
        },
        "reminders": {"useDefault": True}
    }

    try:
        event = calendar_service.events().insert(
            calendarId='9cb44884bae1adea95ac4d63744692c86fe1eb778670dbc924ec4edeaa89770f@group.calendar.google.com', body=event, conferenceDataVersion=1).execute()

        # создание ссылки на видеоконференцию в Google Meet
        conference_data = event.get('conferenceData', {})
        print(conference_data)
        conference_solution = conference_data.get(
            'entryPoints', [{}])[0].get('uri')
        return {"message": f"Событие создано:  {event.get('htmlLink')}", "video": conference_solution}
    except HttpError as error:
        return {"message": "Произошла ошибка: %s" % error}


@ app.get('/api/parser/{kadastr_number}')
async def get_data_kadastr(kadastr_number: str):
    try:
        get_info(kadastr_number)
        with open("dick.json", "r", encoding='utf-8') as json_file:
            data = json.load(json_file)
        return data

    except KeyError:
        raise HTTPException(
            status_code=404, detail=f'Кадастровый номер не найден')
