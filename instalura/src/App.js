import React, { Component } from 'react';
import Header from './Components/Header';
import TimeLine from './Components/TimeLine';

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <TimeLine />
        </div>
      </div>
    );
  }
}

export default App;
