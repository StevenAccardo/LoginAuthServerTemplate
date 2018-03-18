import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* Rendering this.props.children renders the children of the main route that renders this app component */}
        {this.props.children}
      </div>
    );
  }
}
