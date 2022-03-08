import motor.motor_asyncio
from decouple import config

mongo_url=config('url')
client = motor.motor_asyncio.AsyncIOMotorClient(mongo_url)

database = client.OfferDB
offers_collection = database.get_collection("Offers")

#collection = db.offer

#TO-DO