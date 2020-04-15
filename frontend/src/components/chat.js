import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/group.css'
import eggie1 from './../asset/eggie1.png'
import Drawer from './drawer'
import ChatMessages from './chat-messages'
import DeleteIcon from '@material-ui/icons/Delete';

class Chat extends React.Component {
    state = {
        username: 'Yinza55+',
        group: 'Ekkie',
        profile: eggie1,
        // chatMessages: ['Hello', 'How are you?', 'I am fine', 'Fighting you can do it!']
        chatMessages: [
            { user: 'me', message: 'Hello' },
            { user: 'other', message: 'How are you?' },
            { user: 'me', message: 'I am fine' },
            { user: 'other', message: 'Fighting you can do it!' },
            { user: 'me', message: 'THANKS' }
        ]
    }
    render() {
        return (
            <div className='chat' >
                <Drawer></Drawer>
                <div className='chat-panel'>
                    <div className='chat-username'>
                        <img src={this.state.profile}></img>
                        <p>{this.state.username}</p>
                        <span> | </span>
                        <Link className='logout-button' to="/">
                            <Button className='logout-button'
                                color='inherit'
                            >
                                Log out
                            </Button>
                        </Link>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '16px 16px' }}>
                        <div className='chat-group-name'  style = {{display: 'flex', justifyContent: 'center'}}>
                            {this.state.group.toUpperCase()}
                        </div>
                        <DeleteIcon />
                    </div>
                    <div className='chat-content'>
                        <ChatMessages messages={this.state.chatMessages}></ChatMessages>
                    </div>
                    <div className='message-box'>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder='Type your message'
                            fullWidth='true'>
                        </TextField>
                        <Button>Send</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
