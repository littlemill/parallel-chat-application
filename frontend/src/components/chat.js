import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/chat.css'
// import eggie1 from './../asset/eggie1.png'
import Drawer from './drawer'
// import ChatMessages from './chat-messages'
import DeleteIcon from '@material-ui/icons/Delete';
import { TimeGrayBox, UnreadGrayBox } from './grayBox';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class Chat extends React.Component {

    state = {
        available_groups: ['group1', 'group2'],
        my_groups: ['group1', 'group2', 'group3'],
        temp: ['yin_kiatsilp'],
        user: 'yin_kiatsilp',
        group: 'konsuaysuay',
        currentMessage: '',
        messages: false
    }

    componentDidMount() {
        try {
            //1. get user's groups {status: testing available_group and my_groups}

            console.log('componentDidMount')
            socket.emit('getGroupUpdates', 'yin_kiatsilp')
            socket.on('groupinfo', (data) => {
                console.log(data)
                this.setState({ available_groups: data.group, my_groups: data.joinedGroup })
                console.log(this.state)
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    handleDelete() {
        this.props.history.push("/emptyChat")
        socket.emit('leave', { 'member': 'littlemill', 'group': 'konsuaysuay' })
    }

    onSendMessage = (e) => {
        //2. pass message backend {status: complete}

        console.log('send message')
        if (!!this.state.currentMessage) {
            // console.log('sending')
            socket.emit('send', { user: this.state.user, group: this.state.group, time: new Date(), message: this.state.currentMessage }) // chat = {user,group,time,message}
            this.onGetMessages(this.state.group)
            this.setState({ currentMessage: '' })
        }
    }

    onTextFiledPressEnter = (e) => {
        if (e.keyCode === 13) {
            this.onSendMessage()
        }
    }

    onGetMessages = (groupName) => {
        //3. get all chat messages {status: tesing messages}

        console.log('join group')
        socket.emit('join', { member: 'yin_kiatsilp', group: 'konsuaysuay' })
        socket.on('all messages', (data) => {
            this.setState({ messages: data })
            console.log(this.state.messages)
        })
    }

    render() {
        return (
            <div className='chat' >
                <Drawer available_groups={this.state.temp} my_groups={this.state.my_groups} onGetMessages={this.onGetMessages}></Drawer>
                <div className='chat-panel'>
                    <div className='chat-username'>
                        {/* <img src={this.state.profile}></img> */}
                        <p>{this.state.user}</p>
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
                            {this.state.group.toUpperCase()}
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
