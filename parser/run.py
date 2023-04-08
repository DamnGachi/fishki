import datetime

from fastapi import FastAPI, HTTPException, Request
from google_event import create_event
from parser_kadastr import get_info
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware


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


@app.post('/api/google_event', response_class=HTMLResponse)
async def create_google_event(request: Request):
    # data = await request.json()

    # start_time = datetime.datetime.strptime(
    #     data['start_time'], '%Y-%m-%d %H:%M:%S')
    # end_time = datetime.datetime.strptime(
    #     data['end_time'], '%Y-%m-%d %H:%M:%S')
    # attendees = [{'email': email} for email in data['attendees']]
    # summary = data['summary']

    event = create_event() # start_time, end_time, attendees, summary

    if event:
        return HTMLResponse(content='<h1>Event created successfully!</h1>')
    else:
        return HTMLResponse(content='<h1>Failed to create event.</h1>')


@app.get('/api/parser')
async def get_data_kadastr(kadastr_number: str):
    try:
        return get_info(kadastr_number)

    except KeyError:
        raise HTTPException(
            status_code=404, detail=f'Кадастровый номер не найден')
