import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import './../style/join.css';
class Join extends React.Component {

    state = {
        name: "",
        room: ""
    }

    onClickLogin() {
        // console.log(this.state.name)
    }

    render() {
        return (
            <div className='root'>
                <div className='titleBar'><p>LOGO/NAME</p></div>
                <div className='center'>
                    <div className=''>
                        <h1>Welcome,</h1>
                        <TextField placeholder='Please enter your name'
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}>></TextField>
                    </div>
                    <div className='login-button'>
                        <Button component={Link}
                            to="/chat"
                            color="inherite"
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