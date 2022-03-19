import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { Card } from "react-bootstrap"
import axios from 'axios'
import Wagecard from "./offer-components/WageCard"
import Slider from '@material-ui/core/Slider'
import Salarycard from "./offer-components/Salarycard"
import RecurringBonuscard from "./offer-components/RecurringBonus"
import Perkscard from "./offer-components/Perkscard"

// const {offerID} = props.match.params
//     return( //, margin:"0 auto"
//     <div style={{maxWidth:"390px", margin:"0 auto"}}>
//         <body>Congratulations on the offer, {offerID}</body>
//     </div>
//     )

export default function Offer(props) {
    const {offerID} = props.match.params
    const [total, setTotal] = useState(0); //this will control the total value calculation
    const [frequency, setFrequency] = useState(); //this will control the frequency
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [isFixed, setIsFixed] = useState([])
    const [isWage, setIsWage] = useState([])
    const [isRecurringBonus, setIsRecurringBonus] = useState([])
    const [isOneTimeBonus, setIsOneTimeBonus] = useState([])
    const [isDiscounts, setIsDiscounts] = useState([])
    const [isPerks, setIsPerks] = useState([])
    const [isTips, setIsTips] = useState([])
    const [isOther, setIsOther] = useState([])

    const [Fixed, setFixed] = useState(0)
    const [Wage, setWage] = useState(0)
    const [RecurringBonus, setRecurringBonus] = useState(0)
    const [OneTimeBonus, setOneTimeBonus] = useState(0)
    const [Discounts, setDiscounts] = useState(0)
    const [Perks, setPerks] = useState(0)
    const [Tips, setTips] = useState(0)
    const [Other, setOther] = useState(0)

    useEffect(() => { 
        axios
        .get(`http://localhost:8000/api/${offerID}`)
    
        .then((response) => {
            console.log(response)
            setFrequency(response.data.data[0].frequency)
            setName(response.data.data[0].name)
            setTitle(response.data.data[0].title)
            
            setIsFixed([response.data.data[0].fixed_salary.Included, response.data.data[0].fixed_salary.Salary])
            if (response.data.data[0].fixed_salary.Included =="Yes") {
                setFixed(Number(response.data.data[0].fixed_salary.Salary))
            } 
    
            setIsWage([response.data.data[0].hourly_wage.Included,response.data.data[0].hourly_wage.Rate,response.data.data[0].hourly_wage.OT_Mult, response.data.data[0].hourly_wage.OT_Hours, response.data.data[0].hourly_wage.Min_Hours, response.data.data[0].hourly_wage.Max_Hours, response.data.data[0].hourly_wage.Expected_Weekly_Hours])
            if (response.data.data[0].hourly_wage.Included =="Yes") {
                let expectedWeeklyOTHours = Number(Math.max(response.data.data[0].hourly_wage.Expected_Weekly_Hours-response.data.data[0].hourly_wage.OT_Hours,0))
                if (response.data.data[0].frequency == "weekly") {
                    setWage(
                        (expectedWeeklyOTHours*Number(response.data.data[0].hourly_wage.Rate)*Number(response.data.data[0].hourly_wage.OT_Mult)) //Calculates # OT hours then multiplies by OT rate. # OT hours is Max (Expected - OT, 0)
                        + 
                        ((Number(response.data.data[0].hourly_wage.Expected_Weekly_Hours) - expectedWeeklyOTHours)*Number(response.data.data[0].hourly_wage.Rate))
                    )
                }
                if (response.data.data[0].frequency == "Monthly") {
                    setWage(
                        ((expectedWeeklyOTHours*Number(response.data.data[0].hourly_wage.Rate)*Number(response.data.data[0].hourly_wage.OT_Mult)) //Calculates # OT hours then multiplies by OT rate. # OT hours is Max (Expected - OT, 0)
                        + 
                        ((Number(response.data.data[0].hourly_wage.Expected_Weekly_Hours) - expectedWeeklyOTHours)*Number(response.data.data[0].hourly_wage.Rate)))
                        *4
                    )
                }
                if (response.data.data[0].frequency == "Annual") {
                    setWage(
                        ((expectedWeeklyOTHours*Number(response.data.data[0].hourly_wage.Rate)*Number(response.data.data[0].hourly_wage.OT_Mult)) //Calculates # OT hours then multiplies by OT rate. # OT hours is Max (Expected - OT, 0)
                        + 
                        ((Number(response.data.data[0].hourly_wage.Expected_Weekly_Hours) - expectedWeeklyOTHours)*Number(response.data.data[0].hourly_wage.Rate)))
                        *52
                    )
                }
            }

            setIsRecurringBonus([response.data.data[0].recurring_bonus.Included,response.data.data[0].recurring_bonus.Bonus, response.data.data[0].recurring_bonus.Description])
            if (response.data.data[0].recurring_bonus.Included =="Yes") {
                setRecurringBonus(Number(response.data.data[0].recurring_bonus.Bonus))
            } 
        
            setIsOneTimeBonus([response.data.data[0].onetime_bonus.Included,response.data.data[0].onetime_bonus.Bonus, response.data.data[0].onetime_bonus.Description])
            if (response.data.data[0].onetime_bonus.Included =="Yes") {
                setOneTimeBonus(Number(response.data.data[0].onetime_bonus.Bonus))
            } 
            
            setIsDiscounts([response.data.data[0].discounts.Included,response.data.data[0].discounts.Discount_Percentage, response.data.data[0].discounts.Description, response.data.data[0].discounts.Min_Spend, response.data.data[0].discounts.Expected_Spend, response.data.data[0].discounts.Max_Spend])
            if (response.data.data[0].discounts.Included =="Yes") {
                setDiscounts(Number(response.data.data[0].discounts.Discount_Percentage*response.data.data[0].discounts.Expected_Spend))
            }    
            
            setIsPerks([response.data.data[0].perks.Included, response.data.data[0].perks.Amount, response.data.data[0].perks.Description])
            if (response.data.data[0].perks.Included =="Yes") {
                setPerks(Number(response.data.data[0].perks.Amount))
            } 
            
            setIsTips([response.data.data[0].tips.Included, response.data.data[0].tips.Expected_Amount, response.data.data[0].tips.Description])
            if (response.data.data[0].tips.Included =="Yes") {
                setTips(Number(response.data.data[0].tips.Expected_Amount))
            } 

            setIsOther([response.data.data[0].other.Included, response.data.data[0].other.Expected_Amount, response.data.data[0].other.Description])
            if (response.data.data[0].other.Included =="Yes") {
                setOther(Number(response.data.data[0].other.Expected_Amount))
            } 
        })
      }, []);
    
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

     const frequencyCaps = capitalizeFirstLetter(String(frequency)) 

    return(
            <>
            <h1>Delete after: {Wage} </h1>
              <Card style={{maxWidth:"400px", margin:"0 auto", borderRadius: '25px'}}>
                <Card.Body>
                  <h2 className="mb-4 mt-4" style={{fontSize:"25px"}}>Congratulations on the {title} offer, {name}! </h2>
                  <Card className = "mb-4" style={{borderRadius: '25px', backgroundColor: "#9A63FB"}}>
                    <body className="mt-2" style={{fontSize:"13px", textAlign: "center", backgroundColor: "transparent", color:"white"}}>Potential total {frequency} value </body>
                    <body className="mb-2" style={{fontSize:"25px", textAlign: "center", backgroundColor: "transparent", color:"white", fontWeight:"bold"}}>${Fixed+Wage+RecurringBonus+Discounts+Perks+Tips+Other} </body>
                  </Card>
                  <Card style={{borderRadius:"10px"}}>
                      <Card.Title className="ml-3 mt-2 mb-2" style={{color:"#ACACAC"}}> {frequencyCaps} Breakdown:</Card.Title>
                      <Card className="ml-2 mt-2 mb-2 pt-5 pb-5" style={{borderRadius:"10px"}}> Placeholder for comp item </Card>
                      <Salarycard salaryAmount={Fixed} frequency={frequency}></Salarycard>
                      <Wagecard wageAmount={Wage} frequency={frequency}></Wagecard>
                      <RecurringBonuscard bonusAmount={RecurringBonus} frequency={frequency}></RecurringBonuscard>
                      <Perkscard perksAmount={Perks} frequency={frequency}></Perkscard>
                  </Card>
                  <Card className= "mt-3" style={{borderRadius:"10px"}}>
                      <Card.Title className="ml-3 mt-2 mb-2" style={{color:"#ACACAC"}}> Other benefits </Card.Title>
                      <Card className="ml-2 mt-2 mb-2 pt-5 pb-5" style={{borderRadius:"10px"}}> Placeholder for other benefits </Card>
                  </Card>
                </Card.Body>
              </Card>
            </>
    )
}