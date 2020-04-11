import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/group.css'
import eggie1 from './../asset/eggie1.png'
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
                <Drawer></Drawer>
                <div className='chat-panel'>
                    <div className='chat-username'>
                        <img src={this.state.profile}></img>
                        <p>{this.state.username}</p>
                        <span> | </span>
                        <Link to="/"><Button className='underline' color="inherit">Log out</Button></Link>
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
