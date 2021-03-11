import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"

export const MessageList = () => {
    // This state changes when `getMessages()` is invoked below
    const history = useHistory()
    const { messages, getMessages } = useContext(MessageContext)
  
    //useEffect - reach out to the world for something
    //function runs when the value in the array changes
    useEffect(() => {
      getMessages()
  
    }, [])
  
  
    return (
     <>
      <h2>Messages</h2>
      <button onClick={() => {history.push("/messages/create")}}>
         Add Message
      </button>
      <div className="messages">
         {
          messages.map(message => {
                return (
                <p><b>{message.user.name}</b> says   "{message.messageText}"</p>
                
                )
                
          })
            
          }
          </div>
          </>
        )
   
     }
