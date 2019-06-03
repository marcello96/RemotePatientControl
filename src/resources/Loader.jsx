import React, { Component } from 'react';
import './Loader.scss';

class Loader extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: this.props.hasOwnProperty('show') ? this.props.show : false
        };
    }

    render() {
        return (
            <div className="Loader">
                <div className="overlay">
                    <div className="spinner">
                        <div className="sk-folding-cube">
                            <div className="sk-cube1 sk-cube"></div>
                            <div className="sk-cube2 sk-cube"></div>
                            <div className="sk-cube4 sk-cube"></div>
                            <div className="sk-cube3 sk-cube"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;