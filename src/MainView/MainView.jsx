import React, { Component } from 'react';
import './MainView.scss';
import Sidebar from '../components/sidebar/Sidebar';
import Header from "../components/sidebar/Header";
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Monitoring from "../Monitoring/Monitoring";
import PatientsList from "../Patients/Patients"

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    render() {
           const userData = {
            name: this.props.user,
            avatar: {
                src: "url",
                onError: (event) => {
                    event.target.src = require(`../resources/happydoctor.jpg`);
                    event.target.onerror = null;
                }
            }
        };

        return (
            <div className="wrapper">
                <Sidebar onClick={this.hideMenuOnMobile} isActive={this.state.isActive} userData={userData} />
                <Header handleSidebar={this.handleBtnClick.bind(this)}
                        userData={userData} />

                <div id="content" className={this.state.isActive === true ? "active" : ""}>
                    <Switch>
                        <Route path="/home" exact render={() => <Monitoring/>} />
                        <Route path="/home/patients" exact render={() => <PatientsList/>} />
                    </Switch>
                </div>
            </div>
        );
    }

    //used to toggle menu
    handleBtnClick(e) {
        this.setState({
            isActive: this.state.isActive !== true
        });
    }

    hideMenuOnMobile = () => {
        console.log('hide menu');
        const isMobile = window.matchMedia("(max-width: 400px)");
        isMobile.matches && this.setState({
            isActive: true
        });
    }

}

function mapStateToProps(state) {
    const { user, loggedIn } = state.authentication;
    return { user, loggedIn };
}

export default connect(mapStateToProps)(MainView); 
