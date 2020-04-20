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
        username: 'Yinza55+',
        group: 'Ekkie',
        profile: eggie1,
    }
    handleCreate = () => {
        socket.emit('create',{ 'member': 'littlemill', 'group': 'konsuaysuay' })
    }
    render() {
        return (
            <div className="group">
                <Drawer></Drawer>
                <div className='group-panel'>
                    <div className='group-header'>
                        CREATE NEW GROUP
                    </div>
                    <div className='group-content'>
                        <o1 style = {{marginRight: '20px'}}>Group Name:</o1>
                        <TextField
                            style = {{marginRight: '20px'}}
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
