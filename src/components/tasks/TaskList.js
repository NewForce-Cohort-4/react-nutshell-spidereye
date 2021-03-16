import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import "./Task.css"
import { TaskForm } from "./TaskForm"

export const TaskList = () => {
  const { tasks, getTasks } = useContext(TaskContext)

  //we set the displayForm to a false state on page load
  let [displayForm, setDisplayForm] = useState(false)

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getTasks()
  }, [])


  return (
    //here we are asking if the display form is NOT false, which is false on first render, to diplay a form to enter a new task. setDisplayForm is called and we have to pass the variable name into TaskForm
    displayForm === true ?
    <>
      <h1>Tasks</h1>
      <TaskForm functionToHideForm={setDisplayForm}/>
      <div className = "tasks">
          {tasks.map(task => {
            return <TaskCard key = {task.id} task={task} />
          })
        }
      </div>
    </>
    :
    //the else condition changes the state, on click, to display a form after clicking add task
    <>
      <h1>Tasks</h1>
      <button onClick={() => setDisplayForm(true)}>Add Task</button>
      <div className = "tasks">
          {tasks.map(task => {
            return <TaskCard key = {task.id} task={task} />
          })
        }
      </div>
    </>
  )
}