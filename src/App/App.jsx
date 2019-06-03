import React, { Component } from 'react';
import Login from '../login/Login';
import Register from '../Register/Register';
import Logout from '../login/Logout';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRouter } from '../resources/PrivateRouter';
import MainView from '../MainView/MainView';
import WebsiteStart from "../WebsiteStart/WebsiteStart";

class App extends Component {
    render() {
        return ( 
        <BrowserRouter>
            <Switch>
                <Route exact path="/start" component={WebsiteStart}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                {/*<Route exact path="/register" component={Register} />*/}
                <PrivateRouter path="/home" component={MainView} />
                <Redirect from="/" to="/start" />
            </Switch>
        </BrowserRouter>
        )  
    }
}

const connectedApp = connect()(App);
export { connectedApp as App };