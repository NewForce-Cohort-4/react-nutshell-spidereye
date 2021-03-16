import React, { useState, createContext } from 'react'

export const TaskContext = createContext()

export const TaskProvider = (props) => {

    const [tasks, setTasks] = useState([])

    const userId = localStorage.getItem("nutshell_user")
    //getTasks fetchs all the objects with a completed that is false and prints it to the DOM
    const getTasks = () => { 
        return fetch(`http://localhost:8088/tasks?completed=false&userId=${userId}`)
        .then(res => res.json())
        .then(setTasks)
    }

    const addTask = task => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(getTasks)
    }

    const getTaskById = (id) => {
        console.log(id)
        return fetch(`http://localhost:8088/tasks/${id}`)
            .then(res => res.json())
    }

    //completeTask takes in the specific ID and turns the property "completed" to true.
    //then calls getTasks
    const completeTask = taskId => {
        return fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })        
        })
        .then(getTasks)
    }

    const updateTask = task => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
          .then(getTasks)
      }
    
    return (
        <TaskContext.Provider value={{
            tasks, getTasks, addTask, getTaskById, completeTask, updateTask

        }}>
            {props.children}
        </TaskContext.Provider>
    )
}
