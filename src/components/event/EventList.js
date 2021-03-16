import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import "./Event.css"
import { useHistory } from "react-router-dom"

export const EventList = () => {
  const { events, getEventsById} = useContext(EventContext)

  // Since you are no longer ALWAYS displaying all of the articles
  const [ filteredEvents, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getEventsById()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  useEffect(() => {
    const sortedEvents = events.sort((a, b) => b.date - a.date)

    setFiltered(sortedEvents)
  }, [events])

  return (
    <>
      <h1>Events</h1>

      <button className="btn btn-primary" onClick={() => history.push("/events/create")}>
          Add New Event
      </button>
      <div className="events">
      {
        filteredEvents.map(event => {
          return (
          <EventCard key={event.id} event={event} />
          )
        })
      }
      </div>
    </>
  )
}