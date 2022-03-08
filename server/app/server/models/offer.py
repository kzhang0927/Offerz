from datetime import date
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel, Field
from bson.objectid import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# For fixed_salary nested subclass
class Fixed_Salary(BaseModel):
    Included: str = Field(...) 
    Salary: Optional[float] #If chosen we need to require this in UI

# For hourly_wage nested subclass
class Hourly_Wage(BaseModel):
    Included: str = Field(...) #Required
    Rate: Optional[float] # If chosen we need to require this in UI
    OT_Mult: Optional[float] = 1.5 #Defaults to 1.5X rate
    OT_Hours: Optional[float] = 40 #Defaults to 40 hours
    Min_Hours: Optional[float] = 0 #Defaults to 0
    Max_Hours: Optional[float] = 60 #Defaults to 60
    Expected_Weekly_Hours: Optional[float] = 40 #Defaults to 40

# For recurring_bonus nested subclass
class Recurring_Bonus(BaseModel):
    Included: str = Field(...) #Required
    Bonus: Optional[float] # If chosen we need to require this in UI
    Description: Optional[str]

# For one-time bonus nested subclass
class OneTime_Bonus(BaseModel):
    Included: str = Field(...) #Required
    Bonus: Optional[float] # If chosen we need to require this in UI
    Description: Optional[str]

# For discounts nested subclass
class Discounts(BaseModel):
    Included: str = Field(...) #Required
    Discount_Percentage: Optional[float] # If chosen we need to require this in UI
    Description: Optional[str]
    Min_Spend: Optional[float] = 0 #Defaults to $0
    Expected_Spend: Optional[float] # If chosen we need to require this in UI
    Max_Spend: Optional[float] = Expected_Spend*2

# For perks nested subclass
class Perks(BaseModel):
    Included: str = Field(...) #Required
    Amount: Optional[float] # If chosen we need to require this in UI
    Description: Optional[str]

# For tips nested subclass
class Tips(BaseModel):
    Included: str = Field(...) #Required
    Expected_Amount: Optional[float] # If chosen we need to require this in UI
    Description: Optional[str]

class Other(BaseModel):
    Included: str = Field(...) #Required
    Expected_Amount: Optional[float] # If chosen we need to require this in UI
    Description: Optional[str]

#Still need to ensure ID is generated
class OfferSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    frequency: str = Field(...)
    create_date: date = Field(...)
    name: str = Field(...)
    title: str = Field(...)
    details: Optional[str]
    non_monetary_benefits: Optional[str]
    fixed_salary: Fixed_Salary
    hourly_wage: Hourly_Wage
    recurring_bonus: Recurring_Bonus
    onetime_bonus: OneTime_Bonus
    discounts: Discounts
    perks: Perks
    tips: Tips
    other: Other

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "frequency": "weekly",
                "create_date": "2022-02-05",
                "name": "John Doe",
                "title": "Dishwasher",
                "details": "Given full-time dishwasher offer",
                "non_monetary_benefits": "Also gets college credit",
                "fixed_salary": {
                    "Included": "No"
                },
                "hourly_wage": {
                    "Included": "Yes",
                    "Rate":"15"
                },
                "recurring_bonus":{
                    "Included":"No"
                },
                "onetime_bonus":{
                    "Included":"No"
                },
                "discounts":{
                    "Included":"No"
                },
                "perks":{
                    "Included":"No"
                },
                "tips":{
                    "Included":"No"
                },
                "other":{
                    "Included":"Yes",
                    "Expected_Amount":"100",
                    "Description":"Free tax advisor"
                }
            }
        }

# Not including an update possibility yet

# class UpdateOfferSchema(BaseModel):
#     frequency: Optional[str]
#     create_date: Optional[date]
#     name: Optional[str]
#     title: Optional[str]
#     details: Optional[str]
#     non_monetary_benefits: Optional[str]
#     fixed_salary: Optional[Fixed_Salary]
#     hourly_wage: Optional[Hourly_Wage]
#     recurring_bonus: Optional[Recurring_Bonus]
#     onetime_bonus: Optional[OneTime_Bonus]
#     discounts: Optional[Discounts]
#     perks: Optional[Perks]
#     tips: Optional[Tips]
#     other: Optional[Other]

#     class Config:
#         allow_population_by_field_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}
#         schema_extra = {
#             "example": {
#                 "frequency": "weekly",
#                 "create_date": "2022-02-05",
#                 "name": "John Doe",
#                 "title": "Dishwasher",
#                 "details": "Given full-time dishwasher offer",
#                 "non_monetary_benefits": "Also gets college credit",
#                 "fixed_salary": {
#                     "Included": "No"
#                 },
#                 "hourly_wage": {
#                     "Included": "Yes",
#                     "Rate":"15"
#                 },
#                 "recurring_bonus":{
#                     "Included":"No"
#                 },
#                 "onetime_bonus":{
#                     "Included":"No"
#                 },
#                 "discounts":{
#                     "Included":"No"
#                 },
#                 "perks":{
#                     "Included":"No"
#                 },
#                 "tips":{
#                     "Included":"No"
#                 },
#                 "other":{
#                     "Included":"Yes",
#                     "Expected_Amount":"100",
#                     "Description":"Free tax advisor"
#                 }
#             }
#         }

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}

