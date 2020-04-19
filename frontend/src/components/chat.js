import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/chat.css'
import eggie1 from './../asset/eggie1.png'
import Drawer from './drawer'
import ChatMessages from './chat-messages'
import DeleteIcon from '@material-ui/icons/Delete';
import { TimeGrayBox, UnreadGrayBox } from './grayBox';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class Chat extends React.Component {

    state = {
        available_groups: ['group1', 'group2'],
        my_groups: ['group1', 'group2', 'group3'],
        currentMessage: '',
        messages: false,
        groupName: false
    }

    componentDidMount() {
        try {
            //1. get user's groups
            socket.emit('getGroupUpdates', 'yin_kiatsilp')
            socket.on('groupinfo', (data) => {
                // console.log(data)
                // this.setState({ available_groups:data.group, my_groups: data.joinedGroup })
                // console.log(this.state)
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    handleDelete(){
        this.props.history.push("/emptyChat")
        socket.emit('leave',{'member':'littlemill','group':'konsuaysuay'})
        socket.on()

    onSendMessage = (e) => {
        console.log('printed on clicking button')
        console.log(this.state.currentMessage)
        //2. pass message backend
        socket.emit('send', this.currentMessage) // chat = {user,group,time,message}
        socket.on('all messages', (data) => {
            // this.setState({ message: data })
            // console.log(this.state.messages)
        })
    }

    onTextFiledPressEnter = (e) => {
        if (e.keyCode == 13) {
            this.onSendMessage()
        }
    }

    onGetMessages = (groupName) => {
        //3. get all chat messages

        socket.emit('getGroupChat', '') // data = ?
        socket.on('all messages', (data) => {
            //     this.setState({ messages: data })
            //     console.log(this.state.ChatMessages)
        })
        console.log(groupName)
    }

    render() {
        return (
            <div className='chat' >
                <Drawer available_groups={this.state.available_groups} my_groups={this.state.my_groups} onSelectGroup={this.onGetMessages}></Drawer>
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
                        <div className='chat-group-name' style={{ fontSize: "18px" }}>
                            {/* {this.state.group.toUpperCase()} */}
                        </div>
                        <DeleteIcon onClick='handleDelete()'></DeleteIcon>
                    </div>
                    <div className='chat-content' style={{ display: 'flex', flexDirection: 'column' }}>
                        <TimeGrayBox />
                        <UnreadGrayBox />
                        {/* <ChatMessages messages={this.state.chatMessages}></ChatMessages> */}
                    </div>
                    <div className='message-box'>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder='Type your message'
                            fullWidth='true'
                            value={this.state.currentMessage}
                            onChange={e => { this.setState({ currentMessage: e.target.value }) }}
                            onKeyDown={this.onTextFiledPressEnter}>
                        </TextField>
                        <Button onClick={(e) => this.onSendMessage(e)}>Send</Button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Chat;
