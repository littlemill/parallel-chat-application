import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/chat.css'
import eggie1 from './../asset/eggie1.png'
import Drawer from './drawer'
import ChatMessages from './chat-messages'
import DeleteIcon from '@material-ui/icons/Delete';

class EmptyChat extends React.Component {
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '16px 16px' }}>
                        <div className='chat-group-name' style = {{ fontSize: "18px"}}>
                            EMPTY CHAT                        
                        </div>
                        <DeleteIcon/>
                    </div>
                    <div className='chat-content'></div>
                    <div className='message-box'>
                        <TextField
                            disabled
                            variant="outlined"
                            size="small"
                            placeholder='Type your message'
                            fullWidth='true'>
                        </TextField>
                        <Button disabled>Send</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmptyChat;
