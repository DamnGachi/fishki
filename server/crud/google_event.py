
import uuid
from settings import calendar_service,HttpError


def create_event_handler(title, location, description, start_date, end_date):
    event = {
        "summary": title,
        "location": location,
        "description": description,
        "start": {
            "dateTime": start_date,
            "timeZone": "Europe/Moscow",
        },
        "end": {
            "dateTime": end_date,
            "timeZone": "Europe/Moscow",
        },
        "conferenceData": {
            "createRequest": {
                "requestId": f"{uuid.uuid4().hex}",
                "conferenceSolution": {
                    "key": {
                        "type": "hangoutsMeet"
                    }
                },
                "conferenceName": "Meeting",
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
        return {"event": f"{event.get('htmlLink')}", "video": conference_solution}
    except HttpError as error:
        return {"message": "Произошла ошибка: %s" % error}
