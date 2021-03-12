import { Route } from "react-router-dom"
import React, { Component } from "react"
import { TaskProvider } from './tasks/TaskProvider'
import { TaskList } from './tasks/TaskList'
import { TaskForm } from './tasks/TaskForm'
import { TaskDetail } from "./tasks/TaskDetail"

export const ApplicationViews = () => {

    return (
      <>
        <TaskProvider>
          <Route exact path="/tasks/detail/:taskId(\d+)">
              <TaskDetail />
          </Route>
          <Route exact path="/tasks">
              <TaskList />
          </Route>
          <Route exact path="/tasks/create">
              <TaskForm />
          </Route>
          <Route path="/tasks/edit/:taskId(\d+)">
              <TaskForm />
          </Route>
        </TaskProvider>
      </>
    )
  }
