import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useHistory, useParams } from 'react-router-dom';

export const TaskForm = () => {
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
              task: tasks.task
          })
          .then(() => history.push(`/tasks/detail/${tasks.id}`))
        }else {
          addTask({ 
              task: tasks.task
          })
          .then(() => history.push("/tasks"))
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
            <label htmlFor="taskDescription">Task to be performed: </label>
            <input type="text" id="taskDescription" name="name" required autoFocus className="form-control"
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