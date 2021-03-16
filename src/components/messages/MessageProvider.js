import React, { useState, createContext } from "react"
import { useHistory } from "react-router-dom"

//imported and used by other components who need the data
export const MessageContext = createContext()

//establishes what can be used by other components (works in conjunction with MessageContext)
export const MessageProvider = (props) => {

    //setMessages modifies messages to reassign empty array
    const [messages, setMessages] = useState([])
    const history = useHistory()

    //gets the data from database and then uses setMessages function make available 
    const getMessages = () => {
        return fetch(`http://localhost:8088/messages?_expand=user`)
        .then(res => res.json())
        .then(setMessages)
    }

    //posts new message to database
    const addMessage = message => {
        return fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        .then(response => response.json())
    }

    const getMessageById = (id) => {
        return fetch(`http://localhost:8088/messages/${id}`)
        .then(res => res.json())
    } 

    //allows user to modify already-existing message in the database
    const updateMessage = message => {
        return fetch (`http://localhost:8088/messages/${message.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
            .then(getMessages)
            
    }

    const deleteMessage = messageId => {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "DELETE"
        })
            .then(getMessages)
            .then(history.push(`/messages`))
    }



    //makes the elements/functions in the yellow brackets available to other components
    return (
        <MessageContext.Provider value={{
            messages, getMessages, getMessageById, addMessage, updateMessage, deleteMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}
