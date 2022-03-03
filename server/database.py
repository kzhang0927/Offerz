import motor.motor_asyncio
from model import Todo

client = motor.motor_asyncio.AsyncIOMotorClient()

db = client.offerzdb
collection = db.offers

#to add CRUD
