import React, { Component } from 'react';

class Error extends Component {

    render() {
        return(
            <h1>Oops, that's an {this.props.error} :(</h1>
        );
    }
}

export default Error;