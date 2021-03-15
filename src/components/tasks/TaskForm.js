import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useHistory, useParams } from 'react-router-dom';


//functionToHideForm, which is really setDisplayForm, is passed as a prop

export const TaskForm = ({functionToHideForm}) => {
    const { addTask, getTaskById, updateTask } = useContext(TaskContext)
  
    const [tasks, setTasks] = useState({})

    
    const [isLoading, setIsLoading] = useState(true);

    const {taskId} = useParams()
	  const history = useHistory();

    const handleControlledInputChange = (event) => {
      const newTask = { ...tasks }
      newTask[event.target.name] = event.target.value
      setTasks(newTask)
    }

    const handleSaveTask = () => {
      if (parseInt(tasks.locationId) === 0) {
          window.alert("Please select a location")
      } else {
        setIsLoading(true);
        if (taskId){
          updateTask({
              id: tasks.id,
              date: tasks.date,
              completed: tasks.completed, 
              task: tasks.task
              
          })
          .then(() => history.push(`/tasks/detail/${tasks.id}`))
        } else {
          addTask({ 
              date: tasks.date,
              completed: false,
              task: tasks.task
          })
          //after a saving a newly created task, setDisplayForm is called and set to false, which hides the form to enter a new task
          .then(() => functionToHideForm(false))

        }
      }
    }

    useEffect(() => {
        if (taskId){
          getTaskById(taskId)
          .then(task => {
              setTasks(task)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
    }, [])

    return (
      <form className="taskForm">
        <h2 className="taskForm__title">New Task</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="taskDate">Task to be performed: </label>
            <input type="date" id="taskDate" name="date" required autoFocus className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={tasks.date}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="taskDescription">Task to be performed: </label>
            <input type="text" id="taskDescription" name="task" required autoFocus className="form-control"
            placeholder="Task description"
            onChange={handleControlledInputChange}
            defaultValue={tasks.task}/>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveTask()
          }}>
        {taskId ? <>Save Task</> : <>Add Task</>}</button>
      </form>
    )
}