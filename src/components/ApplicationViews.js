import { Route } from "react-router-dom";
import React, { Component } from "react";

import { MessageProvider } from "./messages/MessageProvider"
import { MessageForm } from "./messages/MessageForm"



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
             
        </MessageProvider>
       
      </>
    )
  


    }