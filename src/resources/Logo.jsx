import React, { Component } from 'react';
import BoxIcon from './BoxIcon.jsx';
import './Logo.scss';

class Logo extends Component {
    render() {
        return ( 
            <div className="Logo">
                <BoxIcon /><h1 className="name">ePatient</h1>
            </div> 
        )  
    }
}

export default Logo;