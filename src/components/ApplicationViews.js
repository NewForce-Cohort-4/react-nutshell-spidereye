import { Route } from "react-router-dom";
import React from "react";
import { ArticleProvider } from "./article/ArticleProvider";
import { ArticleForm } from "./article/ArticleForm"
import { ArticleList } from "./article/ArticleList"
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
          </Route>
          <Route path="/articles/edit/:articleId(\d+)">
              <ArticleForm />
          </Route>
        </ArticleProvider>

        <EventProvider>
          <Route exact path="/events">
              <EventList />
          </Route>
          <Route exact path="/events/create">
              <EventForm />
          </Route>
          <Route path="/events/edit/:eventId(\d+)">
              <EventForm />
          </Route>
        </EventProvider>





      </>
    );
}

