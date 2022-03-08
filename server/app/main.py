from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}

@app.get("/api/offer")
async def get_offers():
    return "To-DO to get all offers"

@app.get("/api/offer/{offerid}")
async def get_offer():
    return "To-DO to get a specific offer"

@app.post("/api/offer/")
async def create_offer():
    return "TO-DO to create an offer"

if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)