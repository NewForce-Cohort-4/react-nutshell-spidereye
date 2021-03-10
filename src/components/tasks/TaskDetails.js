import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useParams, useHistory } from "react-router-dom"

export const TaskDetail = () => {
    const { getTaskById, releaseTask } = useContext(TaskContext)

	const [task, setTask] = useState({})

	const {taskId} = useParams();
    const history = useHistory()

useEffect(() => {
    console.log("useEffect", taskId)
    getTaskById(taskId)
    .then((response) => {
      setTask(response)
    })
    }, [])

const handleRelease = () => {
    releaseTask(task.id)
      .then(() => {
        history.push("/tasks")
      })
  }

return (
    <>
    <section className="animal">
      <h3 className="animal__name">{task.name}</h3>
      {/* What's up with the question mark???? See below.*/}
      <div className="animal__location">Location: {task.location?.name}</div>
      <div className="animal__owner">Customer: {task.customer?.name}</div>
    </section>
    <button onClick={handleRelease}>Release Task</button>
    <button onClick={() => {
    history.push(`/animals/edit/${task.id}`)
    }}>Edit</button>
    </>
  )
}