import React from "react"
import { Link, useHistory, useParams } from "react-router-dom"


export default function Offer(props) {
    const {offerID} = props.match.params
    return <h1>Congratulations on the offer, {offerID}</h1>
}