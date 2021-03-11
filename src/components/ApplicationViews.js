import { Route } from "react-router-dom";
import React, { Component } from "react";

import { MessageProvider } from "./messages/MessageProvider"
import { MessageForm } from "./messages/MessageForm"
import { MessageList } from "./messages/MessageList"



export const ApplicationViews = () => {


    return (
      <>
       {/* <Route exact path="/">
                <Home />
       </Route> */}

       <MessageProvider>
     
         <Route exact path="/messages/create">
           <MessageForm />
         </Route>

         <Route exact path="/messages">
            <MessageList />
         </Route>
       
        </MessageProvider>
       
      </>
    )
  


    }