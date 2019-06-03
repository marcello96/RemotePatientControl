import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Form } from "react-bootstrap";
import './Register.scss';
import Logo from '../resources/Logo.jsx';
import { Link, Redirect } from "react-router-dom";
import { userActions } from '../_actions/userActions';
import { connect } from 'react-redux';
import Loading from 'react-loading-spinner';
import Loader from '../resources/Loader';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;
    this.props.dispatch(userActions.register(username, email, password));
  };

  validateForm() {
    return this.state.username.length >= 4 &&
          this.state.username.length <= 16 &&
          this.state.email.length > 0 &&
          this.state.password.length > 0 &&
          this.state.password === this.state.passwordConfirmation; 
  }

  render() {

    if(!!this.props.registerSuccessful) {
      return <Redirect to='/login' />
    }

    return (
      <div className="Register">
        <Logo />
        <div className="label"><h1>Join us!</h1></div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username: </ControlLabel>
            <FormControl 
              autoFocus
              placeholder="6 to 16 characters..."
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email: </ControlLabel>
            <FormControl 
              placeholder="Valid email address..."
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password: </ControlLabel>
            <FormControl 
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
          </FormGroup>
          <FormGroup controlId="passwordConfirmation" bsSize="large">
            <ControlLabel>Confirm password: </ControlLabel>
            <FormControl 
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
              />
          </FormGroup>
          <Button block type="submit" 
                  disabled={!this.validateForm()}
                  bsSize="large">
            Sign up
          </Button>
          <Link to="/">
            <Button block 
                    className="backBtn"
                    bsStyle="danger"
                    bsSize="large">
                Already signed up
            </Button>
          </Link>
        </Form>

        <Loading isLoading={this.props.registerInProgress}
                loadingClassName='loading'
                spinner={Loader}>
        </Loading>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registerInProgress, registerSuccessful } = state.registration;
  return {
    registerInProgress, registerSuccessful
  };
}

export default connect(mapStateToProps)(Register);
