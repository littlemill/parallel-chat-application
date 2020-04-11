import React from 'react';
import './../style/chat.css'
import Drawer from "./drawer";
import eggie1 from "../asset/eggie1.png";
import {Link} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";

class Group extends React.Component {
        state = {
        username: 'Yinza55+',
        group: 'Ekkie',
        profile: eggie1,
    }
    render() {
        return (
            <div className="group">
                <Drawer></Drawer>
                <div className='group-panel'>
                    <div className='group-username'>
                        <img src={this.state.profile}></img>
                        <p>{this.state.username}</p>
                        <span> | </span>
                        <Link to="/"><Button className='underline' color="inherit">Log out</Button></Link>
                    </div>
                    <div className='group-header'>
                        CREATE NEW GROUP
                    </div>
                    <div className='group-content'>
                        <o1>Group Name:</o1>
                        <TextField
                            placeholder='Group Name'>
                        </TextField>
                        <Button>Create</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group;
