
import uuid
from fastapi import FastAPI, HTTPException, Request
from parser_kadastr import get_info
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json'
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

calendar_service = build('calendar', 'v3', credentials=credentials)


@app.post("/create_event/")
# title: str, description: str, start_time: str | None = None, end_time: str | None = None,
async def create_event(conference_data: dict | None = None):
    event = {
        'summary': conference_data['title'],
        'description': conference_data['description'],
        'start': {
            'dateTime': '2023-8-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': '2023-08-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
    }

    if conference_data:
        conference = {
            'createRequest': {
                'conferenceSolutionKey': {
                    'type': 'hangoutsMeet',
                },
                'requestId': str(uuid.uuid4()),
            },
        }
        if 'conferenceSolution' in conference_data:
            conference['createRequest']['conferenceSolutionKey']['type'] = conference_data['conferenceSolution']
        if 'conferenceName' in conference_data:
            conference['createRequest']['conferenceSolutionKey']['name'] = conference_data['conferenceName']
        if 'conferenceEntryPoints' in conference_data:
            conference['entryPoints'] = conference_data['conferenceEntryPoints']

        event['conferenceData'] = conference

    try:
        event = calendar_service.events().insert(
            calendarId='2d4447f0d0ab2b8d117fd7a9836eb8ab8d6dc27b46683720833383e81ec8c38b@group.calendar.google.com', body=event).execute()
        return {"message": "Event created: %s" % (event.get('htmlLink'))}
    except HttpError as error:
        return {"message": "An error occurred: %s" % error}


@app.get('/api/parser/{kadastr_number}')
async def get_data_kadastr(kadastr_number: str):
    try:
        return get_info(kadastr_number)

    except KeyError:
        raise HTTPException(
            status_code=404, detail=f'Кадастровый номер не найден')
