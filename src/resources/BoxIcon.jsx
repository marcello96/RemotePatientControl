import React, { Component } from 'react';
import icon from './patient-logo.png';

class BoxIcon extends Component {
    render() {
        return ( 
            <img src={icon} alt={"patient-logo"}/>
        )  
    }
}

export default BoxIcon;
