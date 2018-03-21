import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Feature from './feature';
import Landing from './landing';
import RequireAuth from './auth/require_auth';

export default class App extends Component {
  render() {
    return (
      //Always renders Header, renders other routes depending on url
      <div>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        {/* You can wrap any component with your hoc in order to provide that component with the hoc functionality. In this case it will make the wrapped component a protected component that the user can only visit if authenticated. */}
        <Route path="/feature" component={RequireAuth(Feature)} />
      </div>
    );
  }
}
