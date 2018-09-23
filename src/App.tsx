import * as React from 'react';
import './App.css';
import ChatContainer from './components/Chat/ChatContainer';

import logo from './logo.svg';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <ChatContainer />
      </div>
    );
  }
}

export default App;
