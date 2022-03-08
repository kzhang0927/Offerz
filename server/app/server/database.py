import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient()

db = client.offerzdb
collection = db.offer

#TO-DO