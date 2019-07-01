import React, { Component } from 'react';
import './Sidebar.scss';
import MenuElement from './MenuElement';
import SidebarHeader from './SidebarHeader';

class Sidebar extends Component {
    render() {
        return(
            <nav id="sidebar" className={this.props.isActive === true ? "active" : ""}>
                <SidebarHeader userData={this.props.userData} />
                <ul className="list-unstyled components">
                    <MenuElement onClick={this.props.onClick} pageLink="/home" glyphName="home" elemText="Monitoring"/>
                    <MenuElement onClick={this.props.onClick} pageLink="/home/patients" glyphName="bell" elemText="Patients"/>
                    <MenuElement onClick={this.props.onClick} pageLink="/home/settings" glyphName="cog" elemText="Settings"/>
                </ul>
            </nav>
        );
    }
}

export default Sidebar;
