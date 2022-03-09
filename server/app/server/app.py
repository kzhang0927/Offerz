from fastapi import FastAPI
from app.server.routes.offer import router as OfferRouter


app = FastAPI()

app.include_router(OfferRouter, tags=["Offer"], prefix="/offer")



@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}