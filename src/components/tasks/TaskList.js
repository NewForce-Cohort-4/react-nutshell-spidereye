import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import "./Task.css"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
  const { tasks, getTasks, searchTerms } = useContext(TaskContext)

  // Since you are no longer ALWAYS displaying all of the animals
  const [ filteredTasks, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getTasks()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = tasks.filter(task => task.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(tasks)
    }
  }, [searchTerms, tasks])

  return (
    <>
      <h1>Tasks</h1>

      <button onClick={() => history.push("/tasks/create")}>
          Add Task
      </button>
      <div className="tasks">
      {
        filteredTasks.map(task => {
          return <TaskCard key={task.id} animal={task} />
        })
      }
      </div>
    </>
  )
}