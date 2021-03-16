import React, {useContext} from "react"
import "./Event.css"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"

export const EventCard = ({ event }) => {
    
    const { releaseEvent } = useContext(EventContext)
    const history = useHistory()

    let handleRelease = () => {
        releaseEvent(event.id)
        .then(() => {
            history.push(`/events`)
        })
    }
    
return (
    <section className="event card">
        <h3 className="event__name">
                { event.name }
        </h3>
        <div className="event__location">{ event.location }</div>
        <div className="event__date">{ event.date }</div>
        <button className="btn btn-danger" onClick={handleRelease}>Delete</button>
        <button className="btn btn-secondary" onClick={() => {
            history.push(`/events/edit/${event.id}`)
            }}>Edit
        </button>
    </section>
    )
}