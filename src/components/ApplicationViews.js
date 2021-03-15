import { Route } from "react-router-dom";
import React from "react";
import { ArticleProvider } from "./article/ArticleProvider";
import { ArticleForm } from "./article/ArticleForm"
import { ArticleList } from "./article/ArticleList"
import { EventProvider } from "./event/EventProvider"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { Home } from "../Home.js"

export const ApplicationViews = () => {

    return (
      <>
        <ArticleProvider>
          <Route exact path="/home">
            <Home />
            <ArticleList />
          </Route>
        </ArticleProvider>

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

        <ArticleProvider>
            <Route exact path="/articles">
                <ArticleList />
            </Route>
            <Route exact path="/articles/create">
                <ArticleForm />
                <ArticleList />
            </Route>
            <Route path="/articles/edit/:articleId(\d+)">
                <ArticleForm />
                <ArticleList />
            </Route>
        </ArticleProvider>

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
