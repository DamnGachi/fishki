from fastapi import FastAPI, HTTPException
from main import get_info
from fastapi.responses import JSONResponse
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


@app.get('/')
async def get_data_kadastr(kadastr_number: str):
    try:
        return get_info(kadastr_number)


    except KeyError:
        raise HTTPException(
            status_code=404, detail=f'Кадастровый номер не найден')
