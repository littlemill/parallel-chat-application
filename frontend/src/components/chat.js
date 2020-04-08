import React from 'react';
import './../style/chat.css'

import NavBar from './navBar'

class Chat extends React.Component {
    render() {


        return (
            <div className='chat' >
                <NavBar></NavBar>
                <div className='chat-panel'>
                    <div className='chat-username'>
                        Chat username
            </div>
                    <div className='chat-group-name'>
                        chat group name
                </div>
                    <div className='display-chat-messages'>
                        chat messages
                </div>
                    <div>typping</div>
                </div>
            </div>
        )
    }
}

export default Chat;
