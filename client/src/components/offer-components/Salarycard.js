import * as React from 'react';
import ReactDOM from 'react-dom';
import { Card } from "react-bootstrap"


export default function Salarycard(props) {
    const salaryAmount = props.salaryAmount
    const frequency = props.frequency
    console.log(props)

    return (
        <Card className="ml-2 mr-2 mt-2 mb-2 pt-3 pb-2" style={{borderRadius:"10px", color:"#ACACAC"}}>
            <Card.Title className = "font-weight-normal ml-4 mr-4 border-0" >Salary</Card.Title>
            <Card.Title className = "font-weight-bold ml-4 mr-4 border-0" style={{color:"black"}}>${salaryAmount} {frequency}</Card.Title>
        </Card>
    )
}
