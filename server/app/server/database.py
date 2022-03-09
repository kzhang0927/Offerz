import motor.motor_asyncio
from decouple import config
from bson.objectid import ObjectId

mongo_url=config('url')
client = motor.motor_asyncio.AsyncIOMotorClient(mongo_url)

database = client.OfferDB
offers_collection = database.get_collection("Offers")

# helpers

def offer_helper(offer) -> dict:
    return {
        "id": str(offer["_id"]),
        "frequency": offer["frequency"],
        "create_date": offer["create_date"],
        "name": offer["name"],
        "title": offer["title"],
        "details": offer["details"],
        "non_monetary_benefits": offer["non_monetary_benefits"],
        "fixed_salary": offer["fixed_salary"],
        "hourly_wage": offer["hourly_wage"],
        "recurring_bonus": offer["recurring_bonus"],
        "onetime_bonus": offer["onetime_bonus"],
        "discounts": offer["discounts"],
        "perks": offer["perks"],
        "tips": offer["tips"],
        "other": offer["other"],
    }

# Retrieve all offers present in the database
async def retrieve_offers():
    offers = []
    async for offer in offers_collection.find():
        offers.append(offer_helper(offer))
    return offers

# Add a new offer into to the database
async def add_offer(offer_data: dict) -> dict:
    offer = await offers_collection.insert_one(offer_data)
    new_offer = await offers_collection.find_one({"_id": offer.inserted_id})
    return offer_helper(new_offer)

# Retrieve an offer with a matching ID
async def retrieve_offer(id: str) -> dict:
    offer = await offers_collection.find_one({"_id": ObjectId(id)})
    if offer:
        return offer_helper(offer)

