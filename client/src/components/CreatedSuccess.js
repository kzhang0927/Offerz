import React from "react"
import { Link } from "react-router-dom"
import { Card, Button, Alert, Table } from "react-bootstrap"

//Page to direct user to after we successfully create an offer. 
// Currently only making happy path, not unhappy paths

export default function CreatedSuccess(props) {
    //Before deploying, we should change the link to be the route
    //Eventually want to make offer copy pastable, or email to me, along with create another offer or go back
    const {offerID} = props.match.params
    return (
    <>
    <div style={{maxWidth:"400px", margin:"0 auto"}}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Offer Created!</h2>
            <body className="text-center mb-4">Link to offer: "https://offerz-app.herokuapp.com/offer/"+{offerID} </body>
            <Link to={'/Offer/'+offerID } className="btn btn-primary w-100 mt-3">
              Go to Offer
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
    )
}

