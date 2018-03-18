//Creates the header navbar that will always be rendered, but will change dependiing on the application state

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    //If application state authenticated flag is true, then user is authenticated, render a signout link.
    if (this.props.authenticated) {
      //show a link to sign out
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">
            Sign Out
          </Link>
        </li>
      );
      //If application state authenticated flag is false, then user is not authenticated, render a signin and signup link.
    } else {
      //using array brackets on the return statement instead of parens allows us to return multiple list items without having to wrap them in a <div> tag.
      //keys were chosen since these list items will not change over time.
      return [
        <li key={1} className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>,
        <li key={2} className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      ];
    }
  }
  render() {
    return (
      <div className="navbar navbar-light">
        {/* Takes the place of a logo, or somehting similar, that will take the user to the root route. */}
        <Link to="/" className="navbar-brand">
          Redux Auth
        </Link>
        {/* Calls function that checks state to determine how header will be rendered */}
        <ul className="nav navbar-nav">{this.renderLinks()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
