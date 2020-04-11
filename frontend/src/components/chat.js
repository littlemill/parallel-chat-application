import React from 'react';
import NavBar from './navBar'
import { Button, TextField } from '@material-ui/core';
import './../style/chat.css'
import eggie1 from './../asset/eggie1.png'

import NavBar from './navBar'
import Drawer from './drawer'

class Chat extends React.Component {
    state = {
        username: 'Yinza55+',
        group: 'Ekkie',
        profile: eggie1,
    }
    render() {
        return (
            <div className='chat' >
                {/* <NavBar></NavBar> */}
                <Drawer></Drawer>
                <div className='chat-panel'>
                    <div className='chat-username'>
                        <img src={this.state.profile}></img>
                        <p>{this.state.username}</p>
                        <span> | </span>
                        <Button className='underline' color="inherit">Log out</Button>
                    </div>
                    <div className='chat-group-name'>
                        {this.state.group}
                    </div>
                    <div className='chat-content'>
                        chat messages
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
