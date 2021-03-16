import { Route } from "react-router-dom";
import React from "react";
import { EventProvider } from "./event/EventProvider"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { TaskProvider } from './tasks/TaskProvider'
import { TaskList } from './tasks/TaskList'
import { TaskForm } from './tasks/TaskForm'
import { TaskDetail } from './tasks/TaskDetail1'
import { MessageProvider } from "./messages/MessageProvider"
import { MessageForm } from "./messages/MessageForm"
import { MessageList } from "./messages/MessageList"


export const ApplicationViews = () => {

    return (
      <>

          <MessageProvider>
     
            <Route exact path="/messages/">
              < MessageList />
            </Route>

            <Route exact path="/messages/create">
                <MessageList />
                <MessageForm />
            </Route>

            <Route exact path="/messages/edit/:messageId(\d+)">
                <MessageList />
                <MessageForm />
            </Route>
   
          </MessageProvider>

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
