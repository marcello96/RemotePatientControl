import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './SidebarHeader.scss';

class SidebarHeader extends Component {
    render() {
        let name = this.props.userData.name;
        let avatar = this.props.userData.avatar;
        return(
            <div className="sidebar-header">
                <Image src={avatar.src}
                        onError={avatar.onError}
                        circle />
                <p className="name">{name}</p>
            </div>
        );
    }
}


export default SidebarHeader;