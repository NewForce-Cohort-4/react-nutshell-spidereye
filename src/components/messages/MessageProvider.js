import React, { useState, createContext } from "react"

//imported and used by other components who need the data
export const MessageContext = createContext()

//establishes what can be used by other components (works in conjunction with MessageContext)
export const MessageProvider = (props) => {

    //setMessages modifies messages to reassign empty array
    const [messages, setMessages] = useState([])

    //gets the data from database and then uses setMessages function make available 
    const getMessages = () => {
        return fetch(`http://localhost:8088/messages`)
        .then(res => res.json())
        .then(setMessages)
    }

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

    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, updateMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}
