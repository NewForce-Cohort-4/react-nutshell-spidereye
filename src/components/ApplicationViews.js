import { Route } from "react-router-dom";
import React from "react";
import { EventProvider } from "./event/EventProvider"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { TaskProvider } from './tasks/TaskProvider'
import { TaskList } from './tasks/TaskList'
import { TaskForm } from './tasks/TaskForm'
import { MessageProvider } from "./messages/MessageProvider"
import { MessageForm } from "./messages/MessageForm"
import { MessageList } from "./messages/MessageList"


export const ApplicationViews = () => {

    return (
      <>



        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact path="/register" render={props => {
            return null
            // Remove null and return the component which will handle user registration
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <MessageProvider>
     
         <Route exact path="/messages/">
            <MessageList />
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



        <EventProvider>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/create">
                <EventForm />
                <EventList />
            </Route>
            <Route path="/events/edit/:eventId(\d+)">
                <EventForm />
                <EventList />
            </Route>
        </EventProvider>


      </>
    );
}

