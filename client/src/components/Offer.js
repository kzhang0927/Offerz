import React, { useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { Card } from "react-bootstrap"


// const {offerID} = props.match.params
//     return( //, margin:"0 auto"
//     <div style={{maxWidth:"390px", margin:"0 auto"}}>
//         <body>Congratulations on the offer, {offerID}</body>
//     </div>
//     )

export default function Offer(props) {
    const {offerID} = props.match.params
    const [total, setTotal] = useState(0); //this will control the total value calculation
    const [frequency, setFrequency] = useState("monthly"); //this will control the frequency
    return(
            <>
              <Card style={{maxWidth:"400px", margin:"0 auto", borderRadius: '25px'}}>
                <Card.Body>
                  <h2 className="mb-4 mt-4" style={{fontSize:"30px"}}>Congratulations on the offer, Kevin! </h2>
                  <Card className = "mb-4" style={{borderRadius: '25px', backgroundColor: "#9A63FB"}}>
                    <body className="mt-2" style={{fontSize:"13px", textAlign: "center", backgroundColor: "transparent", color:"white"}}>Potential total {frequency} value </body>
                    <body className="mb-2" style={{fontSize:"25px", textAlign: "center", backgroundColor: "transparent", color:"white", fontWeight:"bold"}}>$2,000.00 </body>
                  </Card>
                  <Card style={{borderRadius:"10px"}}>
                      <Card.Title className="ml-3 mt-2 mb-2" style={{color:"#ACACAC"}}> Offer Breakdown:</Card.Title>
                      <Card className="ml-2 mt-2 mb-2 pt-5 pb-5" style={{borderRadius:"10px"}}> Placeholder for comp item </Card>
                      <Card className="ml-2 mt-2 mb-2 pt-5 pb-5" style={{borderRadius:"10px"}}> Placeholder for comp item </Card>
                      <Card className="ml-2 mt-2 mb-2 pt-5 pb-5" style={{borderRadius:"10px"}}> Placeholder for comp item </Card>
                  </Card>
                </Card.Body>
              </Card>
            </>
    )
}