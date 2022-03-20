from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Body, HTTPException, status
import motor.motor_asyncio
from decouple import config
from bson.objectid import ObjectId


from app.server.database import (
    retrieve_offers,
    add_offer,
    retrieve_offer
)

from app.server.models.offer import (
    ErrorResponseModel,
    ResponseModel,
    OfferSchema,
    PyObjectId,
    Fixed_Salary,
    Hourly_Wage,
    Recurring_Bonus,
    OneTime_Bonus,
    Discounts,
    Perks,
    Tips,
    Other
)

router = APIRouter()

@router.post("/", response_description="Offer added into the database")
async def add_offer_data(offer: OfferSchema = Body(...)):
    offer = jsonable_encoder(offer)
    new_offer = await add_offer(offer)
    return ResponseModel(new_offer, "Offer added successfully.")

@router.get("/{creator}", response_description="Offers retrieved")
async def get_offers(creator):
    offers = await retrieve_offers(creator)
    if offers:
        return ResponseModel(offers, "Offers retrieved successfully")
    return ResponseModel(offers, "No offers found")

@router.get("/{id}", response_description="Specific offer retrieved")
async def get_offer_data(id):
    offer = await retrieve_offer(id)
    if offer:
        return ResponseModel(offer, "Offer retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Offer doesn't exist.")

#In the future we'll want delete and updates