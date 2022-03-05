from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Hardcoded to localhost
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/offer")
async def get_alloffers():
    return "TO-DO to get all offers for dashboard"

@app.get("/api/offer/{offerid}")
async def get_offer(offerid):
    return "TO-DO to get specific offer data for offer generation & potential editing later on"

@app.post("/api/offer/")
async def create_offer():
    return "TO-DO to create new offer"