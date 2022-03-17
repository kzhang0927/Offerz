import React from "react"
import { Link, useHistory, useParams } from "react-router-dom"


export default function Offer(props) {
    const {offerID} = props.match.params
    return(
    <div className="ml-2 mr-2">
    <h3>Congratulations on the offer, {offerID}</h3>
    </div>
    )
}