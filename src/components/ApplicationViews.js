import { Route } from "react-router-dom";
import React from "react";
import { ArticleProvider } from "./article/ArticleProvider";
import { ArticleForm } from "./article/ArticleForm"
import { ArticleList } from "./article/ArticleList"
import { Home } from "../Home.js"
import { TaskProvider } from './tasks/TaskProvider'
import { TaskList } from './tasks/TaskList'
import { TaskForm } from './tasks/TaskForm'
import { MessageProvider } from "./messages/MessageProvider"
import { MessageForm } from "./messages/MessageForm"
import { MessageList } from "./messages/MessageList"


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




      </>
    );
}