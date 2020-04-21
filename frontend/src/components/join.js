import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './../style/join.css';
import logo from './../asset/logo.png'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class Join extends React.Component {

    state = {
        name: "",
        room: "",
    }

    userLogin(value) {
        this.setState({
            name: value
        });
        socket.emit('login', this.state.name)
        console.log(this.state.name);
        console.log(socket)
    }

    onClickLogin() {
        console.log(this.state.name)
        if (!!this.state.name) {
            this.userLogin(this.state.name)
        }
    }

    render() {
        return (
            <div className='root'>
                <div className='titleBar'><img src={logo}></img><p>EGGIE</p></div>
                <div className='center'>
                    <div className=''>
                        <h1>Welcome,</h1>
                        <TextField placeholder='Please enter your name'
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}>></TextField>
                    </div>
                    <div className='login-button'>
                        <Button component={Link}
                            to={{
                                pathname: "/group",
                                state: { user: this.state.name }
                            }}
                            color="inherite"
                            // params={{ user: this.state.name }}
                            // disabled={!this.state.name}
                            onClick={e => this.onClickLogin()}>
                            Log in
                            </Button>
                    </div>
                </div>
            </div >

        )
    }
}

export default Join