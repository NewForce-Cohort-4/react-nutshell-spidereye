import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. A context stores a certain kind of data to be used in your application. Therefore, when you create a dta provider component in React you need to create a context. Nothing is stored in the context when it's defined. At this point, it's just an empty warehouse waiting to be filled.
export const EventContext = createContext()

// This component establishes what data can be used
export const EventProvider = (props) => {
    const [events, setEvents] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getEvents = () => {
        return fetch("http://localhost:8088/events")
        .then(res => res.json())
        .then(setEvents)
    }

    const addEvent = eventObj => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObj)
        })
        .then(response => response.json())
    }

    const userId = localStorage.getItem("nutshell_user")

    const getEventsById = () => {
        return fetch(`http://localhost:8088/events?userId=${userId}`)
            .then(res => res.json())
            .then(setEvents)
    }

    const getEventById = (id) => {
        return fetch(`http://localhost:8088/events/${id}`)
            .then(res => res.json())
    }

    const releaseEvent = eventId => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        })
            .then(getEventsById)
    }

    const updateEvent = event => {
        return fetch(`http://localhost:8088/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(event)
        })
          .then(getEvents)
      }

        // You return a context provider which has the 'events' state, 'getAnimals' function, anmd the 'addAnimal' function as keys. This allows any child elements to access them.
        return (
            <EventContext.Provider value={{
                events, getEvents, addEvent, getEventsById, getEventById, releaseEvent, updateEvent, searchTerms, setSearchTerms
            }}>
                {props.children}
            </EventContext.Provider>
        )
}