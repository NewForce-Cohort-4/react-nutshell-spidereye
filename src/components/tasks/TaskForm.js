import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { TaskContext } from "/TaskProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Task.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
    const { addTask, getTaskById, updateTask } = useContext(TaskContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    //for edit, hold on to state of animal in this view
    const [tasks, setTasks] = useState({})
    
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {animal Id} = useParTask 
	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newTask = { ...tasks }
      //animal is an object with properties.
      //set the property to the new value
      newTask[event.target.name] = event.target.value
      //update state
      setTasks(newTask)
    }

    const handleSaveTask = () => {
      if (parseInt(tasks.locationId) === 0) {
          window.alert("Please select a location")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (animal Id){
          //PUT - update
          updateTask({
              id: animal.id,
              name: animal.name,
              breed: animal.breed,
              locationId: parseInt(animal.locationId),
              customerId: parseInt(animal.customerId)
          })
          .then(() => history.push(`/animals/detail/${animal.id}`))
        }else {
          //POST - add
          addTask({
              name: animal.name,
              breed: animal.breed,
              locationId: parseInt(animal.locationId),
              customerId: parseInt(animal.customerId)
          })
          .then(() => history.push("/animals"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
      getCustomers().then(getLocations).then(() => {
        if (animalId){
          getTaskById(animalId)
          .then(animal => {
              setTask(animal)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="animalForm">
        <h2 className="animalForm__title">New Task</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="animalName">Task name: </label>
            <input type="text" id="animalName" name="name" required autoFocus className="form-control"
            placeholder="Task name"
            onChange={handleControlledInputChange}
            defaultValue={animal.name}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="location">Assign to location: </label>
            <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a location</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="customer">Customer: </label>
            <select value={animal.customerId} name="customerId" id="customerTask" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveTask()
          }}>
        {animalId ? <>Save Animal</> : <>Add Animal</>}</button>
      </form>
    )
}