from datetime import date
from pydantic import BaseModel

#To-do temporary placeholder
class offers(BaseModel):
    frequency: str
    offerID: str
    create_date: date
    name: str
    title: str
    details: str
   # fixed_salary: #nested
   # hourly_wage: #nested
   # recurring_bonus: #nested
   # onetime_bonus: #nested
   # discounts: #nested
   # perks: #nested
   # tips: #nested
   # other: #nested