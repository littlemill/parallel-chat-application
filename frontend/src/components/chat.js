import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/chat.css'
import eggie1 from './../asset/eggie1.png'
import Drawer from './drawer'
import ChatMessages from './chat-messages'
import DeleteIcon from '@material-ui/icons/Delete';

import openSocket from 'socket.io-client';
// import socketIO from 'socket.io'
// import express from 'express'

const socket = openSocket('http://localhost:3000');

class Chat extends React.Component {

        state = {
            // typeText: "",
            // currentPage: "Login",
            // username: "",
            // currentGroup: "Not in group.",
            // isJoinGroupList: [], // [true, false, true],
            // groupList: [], //["Group1", "Group2", "Group3"],
            // allChats: { // If want dummy ,GO copy from past it's too long
            response: false,
        }

    componentDidMount() {
        try{
            socket.emit('getGroupUpdates','yin_kiatsilp')
            socket.on('groupinfo',  (data) => {
                console.log(data)
                this.setState({ response: data })
                console.log(this.state)
            })
        }
        catch(e){
            console.log(e);
        }
    }


    // this.SocketEmit = this.SocketEmit.bind(this);
    //end socket

    // SocketEmit(event, value) {
    //     this.socket.emit(event, value);
    // }
    // state = {
    //     username: 'Yinza55+',
    //     group: 'Ekkie',
    //     profile: eggie1,
    //     // chatMessages: ['Hello', 'How are you?', 'I am fine', 'Fighting you can do it!']
    //     chatMessages: [
    //         { user: 'me', message: 'Hello' },
    //         { user: 'other', message: 'How are you?' },
    //         { user: 'me', message: 'I am fine' },
    //         { user: 'other', message: 'Fighting you can do it!' },
    //         { user: 'me', message: 'THANKS' }
    //     ]
    // }
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '16px 16px' }}>
                        <div className='chat-group-name'>
                            {/* {this.state.group.toUpperCase()} */}
                            Hello
                        </div>
                        <DeleteIcon />
                    </div>
                    <div className='chat-content'>
                        {/* <ChatMessages messages={this.state.chatMessages}></ChatMessages> */}
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
            </div >
        )
    }
}
export default Chat;
