import * as React from 'react';
import ReactDOM from 'react-dom';
import { Card } from "react-bootstrap"


export default function NonMonetarycard(props) {
    const Description = props.Description

    return (
        <Card className="ml-2 mr-2 mt-2 mb-2 pt-3 pb-2" style={{borderRadius:"10px", color:"#ACACAC"}}>
            <Card.Title className = "font-weight-normal ml-4 mr-4 border-0" >Additional</Card.Title>
            <Card.Title className = "font-weight-normal ml-4 mr-4 border-0" style={{fontSize:"15px", color:"black"}}>{Description}</Card.Title>
        </Card>
    )
}
