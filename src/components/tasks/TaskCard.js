import React, { useContext } from "react"
import "./Task.css"
import { Link } from "react-router-dom"
import { TaskContext } from "./TaskProvider"

export const TaskCard = ({ task }) => {

  //completeTask a function the database that occurs
  const { completeTask } = useContext(TaskContext)


  //handleComplete executes completeTask and passes in the specific tasks ID
  let handleComplete = () => {
    completeTask(task.id)
  }

  return (
    //The onClick is an event listener. When a click occurs handleComplete runs
    <section className="task">
        <label htmlFor="taskCheckbox">Task completed?</label>
        <input type="checkbox" id="taskCheckbox" onClick={handleComplete}></input>
        <h3 className="task__name">
          <Link to={`/tasks/detail/${task.id}`}>
            { task.task } 
          </Link>
        </h3>
    </section>)
}