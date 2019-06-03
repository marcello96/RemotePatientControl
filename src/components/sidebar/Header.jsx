import { Image, Navbar, Nav, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import React, {Component} from 'react';
import './Header.scss';
import logo from '../../resources/patient-logo.png';
import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        //let name = this.props.userData.name;
        let avatar = this.props.userData.avatar;

        return ( <div id="header-menu">
            <Navbar className="navbar" fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src={logo} />
                        <span>ePatient</span>
                    </Navbar.Brand>
                    <Navbar.Text>
                        <Nav pullLeft>
                            <button onClick={this.props.handleSidebar} type="button" id="sidebarCollapse"
                                    className="btn2 btn2-info navbar2-btn">
                                <Glyphicon glyph="align-justify"/>
                            </button>
                        </Nav>
                    </Navbar.Text>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown  eventKey={1} title={
                            <span>
                                <Image id="user-avatar"
                                    src={avatar.src}
                                    onError={avatar.onError}
                                    circle />
                            </span> } id="basic-nav-dropdown">
                            <MenuItem eventKey={1.4}>
                                    <Link to="/logout">
                                        <Glyphicon glyph="off"/>
                                        <span className="header-menu-elem-text">Log out</span>
                                    </Link>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }
}

export default Header;