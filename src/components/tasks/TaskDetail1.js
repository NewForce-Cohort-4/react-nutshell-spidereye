import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import "./Task.css"
import { useParams, useHistory } from "react-router-dom"

export const TaskDetail = () => {
  const { getTaskById, completeTask } = useContext(TaskContext)

	const [tasks, setTasks] = useState({})

	const {taskId} = useParams();
  const history = useHistory()

useEffect(() => {
    getTaskById(taskId)
    .then((response) => {
        setTasks(response)
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
    <section className="task">
      <div className="task__date">{tasks.date}</div>
      <div className="task__task">{tasks.task}</div> 
    </section>
    <button onClick={handleRelease}>Delete Task</button>
    <button onClick={() => {
    history.push(`/tasks/edit/${tasks.id}`)
    }}>Edit</button>
    </>
  )
}