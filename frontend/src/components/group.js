import React from 'react';
import './../style/group.css'
import Drawer from "./drawer";
import eggie1 from "../asset/eggie1.png";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class Group extends React.Component {
    state = {
        available_groups: [],
        my_groups: [],
        user: false,
    }

    componentDidMount() {
        try {
            //1. get user's groups {status: complete}

            console.log('componentDidMount')
            socket.emit('getGroupUpdates', this.props.location.state.user)
            socket.on('groupinfo', (data) => {
                this.setState({ available_groups: data.group, my_groups: data.joinedGroup, user: this.props.location.state.user })
                console.log(this.state)
            })

        }
        catch (e) {
            console.log(e);
        }
    }

    handleCreate = () => {
        socket.emit('create', { 'member': 'littlemill', 'group': 'konsuaysuay' })
    }

    onGetMessages = (groupName) => {
        socket.emit('join', { group: groupName, member: this.state.user })
        this.props.history.push({
            pathname: "/chat",
            state: { user: this.state.user, group: groupName }
        })
    }
    render() {
        return (
            <div className="group">
                <Drawer available_groups={this.state.available_groups} my_groups={this.state.my_groups} onGetMessages={this.onGetMessages} user={this.state.user}></Drawer>
                <div className='group-panel'>
                    <div className='group-header'>
                        CREATE NEW GROUP
                    </div>
                    <div className='group-content'>
                        <o1 style={{ marginRight: '20px' }}>Group Name:</o1>
                        <TextField
                            style={{ marginRight: '20px' }}
                            placeholder='Group Name'>
                        </TextField>
                        <Button onClick={this.handleCreate} variant="outlined" disabled style={{ borderRadius: 40, width: '300 px' }}>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group;
