import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Glyphicon, Form, Col } from "react-bootstrap";
import './Login.scss';
import Logo from '../resources/Logo.jsx';
import { Link, Redirect } from "react-router-dom";
import { userActions } from '../_actions/userActions';
import { connect } from 'react-redux';
import Loading from 'react-loading-spinner';
import Loader from '../resources/Loader';

class Login extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const credentials = this.state, 
          { dispatch } = this.props;
    dispatch(userActions.login(credentials));
  };

  render() {

    if(!!this.props.loggedIn) {
      return <Redirect to='/home' />
    }

    return (
      <div className="Login">
        <Logo />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <Col componentClass={ControlLabel} sm={2} xsHidden>
              <Glyphicon glyph="user" />
            </Col>
            <Col sm={10}>
              <FormControl 
                autoFocus
                bsSize="small"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
          <Col componentClass={ControlLabel} sm={2} xsHidden>
            <Glyphicon glyph="lock" />
          </Col>
          <Col sm={10}>
            <FormControl 
                bsSize="small"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <Button block type="submit" bsSize="large">Sign in</Button>
          <Link to="/register">
            <Button block 
                    className="registerBtn"
                    bsStyle="danger"
                    bsSize="large">
                Sign up!
            </Button>
          </Link>
        </Form>
        <Loading isLoading={this.props.loggingInProgress}
                loadingClassName='loading'
                spinner={Loader}>
         </Loading>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingInProgress, loggedIn } = state.authentication;
  return {
    loggingInProgress, loggedIn
  };
}

export default connect(mapStateToProps)(Login);
