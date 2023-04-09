
import json
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

calendar_service = build('calendar', 'v3', credentials=credentials)


@app.post("/create_event/")
async def create_event(conference_data: dict | None = None):
    event = {
        'summary': conference_data['title'],
        'description': conference_data['description'],
        'start': {
            'dateTime': conference_data['start_time'],
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': conference_data['end_time'],
            'timeZone': 'America/Los_Angeles',
        },
        'conferenceDataVersion': 1,
        'conferenceData': {
            'createRequest': {
                'conferenceSolutionKey': {
                    'type': 'hangoutsMeet',
                },
                'requestId': str(uuid.uuid4()),
            },
        },
    }

    if 'conferenceSolution' in conference_data:
        event['conferenceData']['createRequest']['conferenceSolutionKey']['type'] = conference_data['conferenceSolution']
    if 'conferenceName' in conference_data:
        event['conferenceData']['createRequest']['conferenceSolutionKey']['name'] = conference_data['conferenceName']
    if 'conferenceEntryPoints' in conference_data:
        event['conferenceData']['entryPoints'] = conference_data['conferenceEntryPoints']

    try:
        event = calendar_service.events().insert(
            calendarId='2d4447f0d0ab2b8d117fd7a9836eb8ab8d6dc27b46683720833383e81ec8c38b@group.calendar.google.com', body=event).execute()

        # Create Google Meet video conferencing link
        conference_data = event.get('conferenceData', {})
        conference_solution = conference_data.get(
            'entryPoints', [{}])[0].get('uri')
        return {"message": "Event created: %s \n Video conference link: %s" % (event.get('htmlLink'), conference_solution)}
    except HttpError as error:
        return {"message": "An error occurred: %s" % error}


@app.get('/api/parser/{kadastr_number}')
async def get_data_kadastr(kadastr_number: str):
    try:
        get_info(kadastr_number)
        with open("dick.json", "r", encoding='utf-8') as json_file:
            data = json.load(json_file)
        return data

    except KeyError:
        raise HTTPException(
            status_code=404, detail=f'Кадастровый номер не найден')
