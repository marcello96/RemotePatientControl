import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MenuElement extends Component {

    render() {
        return(
            <li onClick={this.props.onClick}>
                <Link to={this.props.pageLink}>
                    <Glyphicon glyph={this.props.glyphName}/>
                    <span className="menu-elem-text">
                        {this.props.elemText}
                    </span>
                </Link>
            </li>
        );
    }
}

export default MenuElement;