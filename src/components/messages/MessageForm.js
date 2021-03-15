import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import { useHistory, useParams } from 'react-router-dom'

export const MessageForm = () => {

    const { addMessage, getMessageById, updateMessage, deleteMessage} = useContext(MessageContext)

    //setMessage will allow the empty object to populate with the data gathered from the form
    const [message, setMessage] = useState({
        messageText:"",
        userId:""
    })
    //I don't understand this
    const [isLoading, setIsLoading] = useState(true);

    //I think this has to do with modifying a posted message
    const { messageId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {

        //when changing a state object or array, you need to create a copy before you make your changes and set state
        const newMessage = {...message}
        
        
        //I don't understand this
        newMessage[event.target.id] = event.target.value
        console.log(event.target.id)
        debugger
        
        //updates state
        setMessage(newMessage)

    }
    const currentDate = new Date()
    const localTimeString = currentDate.toLocaleTimeString(undefined, {
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const localDateString = currentDate.toLocaleDateString('en-US')

    const handleClickSaveMessage = () => {
        setIsLoading(true);
        if(messageId){
            updateMessage({
                id: message.id,
                userId:parseInt(message.userId),
                messageText: message.messageText,
                date: localDateString,
                timestamp: localTimeString,
                status: "edited at"

            })
            .then(() => history.push(`/messages`))
        } else {
            addMessage({
                userId: parseInt(localStorage.getItem("nutshell_user")),
                messageText: message.messageText,
                date: localDateString,
                timestamp:localTimeString,
                status: "posted at"
            })

            .then(() => history.push(`/messages`))
        }
    }
//Function to delete messages

    const handleDelete = () => {
        deleteMessage(message.id)
          .then(() => {
            history.push("/messages")
          })
      }


// I don't know what is happening here/Submit button disables when it's blocked out/message to edit not populated
         useEffect(() => {
            // getMessages().then(() => {
                if(messageId) {
                    getMessageById(messageId)
                    .then(message => {
                        setMessage(message)
                        setIsLoading(false)
                    })
                } else {
                    setIsLoading(false)
                }
 
            // })
         }, [])




         return (
            <form className="MessageForm">
            
             <fieldset>
            <div className="form-group">
                <label htmlFor="messageText">Message text </label>
             <textarea type="textarea" cols="40" id="messageText" onChange={handleControlledInputChange} required autoFocus className="form-control form-text-box" placeholder="Type message here." value={message.messageText}/>
           </div>
           </fieldset>
          
                
           <button className="btn btn-primary"
                 disabled={isLoading}
                 onClick={event => {
                   event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                   handleClickSaveMessage()
                 }}>
               {messageId ? <>Submit changes</> : <>Submit new message</>} </button>

               <button onClick={handleDelete} className="btn btn-primary delete-btn"> {messageId ? <> Delete </>: <> Cancel </>}</button>
            </form>


         )

}