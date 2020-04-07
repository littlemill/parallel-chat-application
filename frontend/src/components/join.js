import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import history from './../logic/history';

// import { joinStyle } from './../style/join';
import './../style/join.css';
// import styles from './../style/join.less'
// const classes = joinStyle();
class Join extends React.Component {

    state = {
        name: "",
        room: ""
    }

    render() {
        return (
            <div className='root'>
                <div className='titleBar'><p>LOGO/NAME</p></div>
                <div className='center'>
                    <div className=''>
                        <h1>Welcome,</h1>
                        <TextField placeholder='Please enter your name'></TextField>
                    </div>
                    <div>
                        <Button color="primary">Log in</Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default Join