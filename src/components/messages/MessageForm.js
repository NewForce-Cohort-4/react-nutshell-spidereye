import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import { useHistory, useParams } from 'react-router-dom'

export const MessageForm = () => {

    const { addMessage, getMessageById, getMessages, updateMessage} = useContext(MessageContext)

    //setMessage will allow the empty object to populate with the data gathered from the form
    const [message, setMessage] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    //I think this has to do with modifying a posted message
    const { messageId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {

        //when changing a state object or array, you need to create a copy before you make your changes and set state
        const newMessage = {...message}
        
        newMessage[event.target.id] = event.target.value
        console.log(event.target.id)
        console.log(event.target.value)
        debugger
        
        //updates state
        setMessage(newMessage)

    }


    const handleClickSaveMessage = () => {
        setIsLoading(true);
        if(messageId){
            updateMessage({
                id: message.id,
                messageText: message.messageText

            })
            .then(() => history.push(`/messages`))
        } else {
            addMessage({
                messageText: message.messageText
            })
            .then(() => history.push("/messages"))
        }
    }

         useEffect(() => {
            getMessages().then(() => {
                if(messageId) {
                    getMessageById(messageId)
                    .then(message => {
                        setMessage(message)
                        setIsLoading(false)
                    })
                } else {
                    setIsLoading(false)
                }
 
            })
         }, [])




         return (
            <form className="MessageForm">
            <h2 className="MessageForm__title">New Message</h2>
             <fieldset>
            <div className="form-group">
                <label htmlFor="messageText">Message text </label>
             <input type="text" id="messageText" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Type message here." value={message.messageText}/>
           </div>
           </fieldset>
          
                
           <button className="btn btn-primary"
                 disabled={isLoading}
                 onClick={event => {
                   event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                   handleClickSaveMessage()
                 }}>
               {messageId ? <>Save Message</> : <>Add Message</>} </button>
            </form>


         )

}