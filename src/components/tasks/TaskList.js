import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import "./Task.css"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
  const { tasks, getTasks } = useContext(TaskContext)

  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getTasks()
  }, [])


  return (
    <>
      <h1>Tasks</h1>
      <button onClick={() => history.push("/tasks/create")}>
          Add Task
      </button>
      <div className = "tasks">
          {tasks.map(task => {
            return <TaskCard key = {task.id} task={task} />
          })
        }
      </div>
    </>
  )
}