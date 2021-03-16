import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import './Messages.css'

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
      <div className="messageBox">
      <div className="messages">
         {
          messages.map(message => { 
                
            if(message.userId == localStorage.getItem("nutshell_user")){
                return (
                
                <p><b>{message.user.name}</b> says "{message.messageText}" <i>{message.status}</i> {message.timestamp} {message.date} <button className="btn btn-primary" onClick={() => {
                    history.push(`/messages/edit/${message.id}`)
              }}>Edit or Delete </button> </p> 
             
                )
            } else {
                return (
                
                    <p><b>{message.user.name}</b> says "{message.messageText}" <i>{message.status}</i> {message.timestamp} {message.date}</p>

                    )
            }
               
                
          })
         
          }
          </div>
          </div>
          </>
        )
   
     }
