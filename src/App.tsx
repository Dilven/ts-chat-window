import * as React from 'react';
import './App.css';
import db from './firebase';

import logo from './logo.svg';

class App extends React.Component {
  
  state = {
    messages: []
  }
  public addMessage = () => {
    db.collection('messages').add({
      createAt: Date.now(),
      message: 'Yupi!',
      senderID: '2',
      senderName: 'Kamil'
    });
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.addMessage}>Send </button>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
