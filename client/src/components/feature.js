//Protected component which the user can only access if authenticated

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    //Calls the action creator
    this.props.fetchMessage();
  }

  render() {
    //Renders the protected message
    return <div>{this.props.message}</div>;
  }
}

function mapStateToProps(state) {
  //Pulls off the message from the application state, specifically.
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
