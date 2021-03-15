import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "../event/EventProvider"
import "./Event.css"
import { useHistory, useParams } from 'react-router-dom';

export const EventForm = () => {
    const { addEvent, updateEvent, getEventById } = useContext(EventContext)

    //for edit, hold on to state of event in this view
    const [newEvent, setNewEvent] = useState({
        name: "",
        location: "",
        date: "",
        userId: parseInt(localStorage.getItem("nutshell_user"))
    })
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {eventId} = useParams();
	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newCurrentEvent = { ...newEvent }
      //event is an object with properties.
      //set the property to the new value
      newCurrentEvent[event.target.name] = event.target.value
      //update state
      setNewEvent(newCurrentEvent)
    }

    const handleSaveEvent = () => {
      if (newEvent.name ===  "" || newEvent.location === "" || newEvent.date === "") {
          window.alert("Please fill out all input fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (eventId){
          //PUT - update
          updateEvent({
              id: newEvent.id,
              name: newEvent.name,
              location: newEvent.location,
              date: newEvent.date,
              userId: parseInt(newEvent.userId)
          })
          .then(() => history.push(`/events/`))
        }else {
          //POST - add
          addEvent({
            id: newEvent.id,
            name: newEvent.name,
            location: newEvent.location,
            date: newEvent.date,
            userId: parseInt(localStorage.getItem("nutshell_user"))
          })
          .then(() => history.push("/events/"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        if (eventId){
          getEventById(eventId)
          .then(event => {
              setNewEvent(event)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
    }, [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="eventForm">
        <h2 className="eventForm__title">Add Event</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="eventName">Name: </label>
            <input type="text" id="eventName" name="name" required autoFocus className="form-control"
            placeholder="Event Name"
            onChange={handleControlledInputChange}
            defaultValue={newEvent.name}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="eventLocation">Location: </label>
            <input type="text" id="eventLocation" name="location" className="form-control"
            placeholder="Location"
            onChange={handleControlledInputChange}
            defaultValue={newEvent.location}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="eventDate">Location: </label>
            <input type="date" id="eventDate" name="date" className="form-control"
            placeholder="Date"
            onChange={handleControlledInputChange}
            defaultValue={newEvent.date}/>
          </div>
        </fieldset>
        
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveEvent()
          }}>
        {eventId ? <>Save Event</> : <>Save Event</>}</button>
      </form>
    )
}