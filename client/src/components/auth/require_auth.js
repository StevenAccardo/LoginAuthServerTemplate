//A higher order component
//Redirects user back to the root route if they are not authenticated

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//A function that accepts a component
//The function will add additional functionality to the basic component
export default function(ComposedComponent) {
  class Authentication extends Component {
    //called whenever the component is about to be rendered
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    //called whenever the component is going to receive new props.
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      //renders the passed in component, as well as passing through any props suing the spread operator
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  //uses connect to gain access to the redux store, so we can tell if the user is logged in or logged out
  return connect(mapStateToProps)(Authentication);
}
