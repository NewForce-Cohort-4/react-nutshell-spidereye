import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import "./Task.css"
import { TaskForm } from "./TaskForm"

export const TaskList = () => {
  const { tasks, getTasks } = useContext(TaskContext)

  let [displayForm, setDisplayForm] = useState(false)

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getTasks()
  }, [])


  return (
    displayForm ?
    <>
      <h1>Tasks</h1>
      <TaskForm />
      <div className = "tasks">
          {tasks.map(task => {
            return <TaskCard key = {task.id} task={task} />
          })
        }
      </div>
    </>
    :
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