import { Route } from "react-router-dom";
import React from "react";
import { EventProvider } from "./event/EventProvider"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
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

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />



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