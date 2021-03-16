import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useParams, useHistory } from "react-router-dom"

export const TaskDetail = () => {
    const { getTaskById, completeTask } = useContext(TaskContext)

	const [tasks, setTask] = useState({})

	const {tasksId} = useParams();
    const history = useHistory()

useEffect(() => {
    console.log("useEffect", tasksId)
    getTaskById(tasksId)
    .then((response) => {
      setTask(response)
    })
    }, [])

const handleRelease = () => {
    completeTask(tasks.id)
      .then(() => {
        history.push("/tasks")
      })
  }

return (
    <>
    <section className="tasks">
      <h3 className="tasks__name">{tasks.task}</h3>
      <p>{tasks.date}</p>
    </section>
    <button onClick={handleRelease}>Delete Task</button>
    <button onClick={() => {
    history.push(`/tasks/edit/${tasks.id}`)
    }}>Edit</button>
    </>
  )
}