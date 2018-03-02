import React, { Component } from 'react';
import Header from './Components/Header';
import TimeLine from './Components/TimeLine';

class App extends Component {
  // Podemos acessar as props no próprio constructor
  constructor(props) {
    super(props);

    // TODO: Página publica para /timeline/:username
    // olhar propriedade this.props.match para verificar se foi chamado /timeline ou /timeline/:username
  }
  
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <TimeLine params={this.props.match.params} />
        </div>
      </div>
    );
  }
}

export default App;
