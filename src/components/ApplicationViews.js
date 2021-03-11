import { Route } from "react-router-dom"
import React, { Component } from "react"
import { TaskProvider } from './tasks/TaskProvider'
import { TaskList } from './tasks/TaskList'
import { TaskForm } from './tasks/TaskForm'

export const ApplicationViews = () => {

    return (
      <>
        <TaskProvider>
          <Route path="/tasks/edit/:taskId(\d+)">
              <TaskForm />
          </Route>
          <Route exact path="/tasks">
              <TaskList />
          </Route>
          <Route exact path="/tasks/create">
              <TaskForm />
          </Route>
        </TaskProvider>
      </>
    )
  }
