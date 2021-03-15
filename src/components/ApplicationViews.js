import { Route } from "react-router-dom";
import React from "react";
import { EventProvider } from "./event/EventProvider"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { Home } from "../Home.js"

export const ApplicationViews = () => {

    return (
      <>

        <EventProvider>
          <Route exact path="/home">
            <Home />

            <EventList />
          </Route>
        </EventProvider>


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

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

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
