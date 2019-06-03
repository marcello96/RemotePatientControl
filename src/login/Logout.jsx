import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userActions } from '../_actions/userActions'; 

class Logout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.dispatch(userActions.logout);
}

  render() {
    return (
      <Redirect to="/" />
    );
  }

}

export default connect()(Logout);