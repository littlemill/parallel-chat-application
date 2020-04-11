import React from 'react'
import './../style/chat-messages.css'

class ChatMessages extends React.Component {
    render() {
        return <div className='container'>
            {this.props.messages.map((message) => {
                return <div className={message.user === 'me' ? 'my-message' : 'other-message'}>{message.message}</div>
            })}
        </div>
    }
}

export default ChatMessages