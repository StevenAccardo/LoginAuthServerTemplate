import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router-dom';
//Redux middleware that allows us to use functions and call the dispatch() method to send actions to the reducers when we need to instead of using the standard action creator.
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Feature from './components/feature';
import Landing from './components/landing';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//declare the store before checking for the token, so thatway if there is a token stored in localStorafe you can change the authentication flag in the store if the user had signed in before, then you pass the store after the check and update have been made. That way if the user accidently exits outt of the window and returns, or refreshes, the application will render in an authorized state.
const store = createStoreWithMiddleware(reducers);

//Checks for JWT in local storage
const token = localStorage.getItem('token');
//If there is a token, condsider the user to be signed in
if (token) {
  // Update application state
  //use the dispatch method to send out an action, that will run through all of the reducers, in this case AUTH_USER will flip the authenticated state to true.
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  //Variable store is passed in AFTER checking for the JWT to determine whether the user is logged in or not.
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {/* Index route is a child to the route above, and will be rendered whenever someone travels to the "/" path */}
        <IndexRoute component={Landing} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        {/* You can wrap any component with your hoc in order to provide that component with the hoc functionality. In this case it will make the wrapped component a protected component that the user can only visit if authenticated. */}
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
