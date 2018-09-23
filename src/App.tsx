import * as React from 'react';
import './App.css';
import db from './firebase';

import logo from './logo.svg';

interface IState {
  messages: Array<{
    id: string,
    message: string
  }>
}

// interface IProps {}

class App extends React.Component<{}, IState> {
  messagesListener: any = null;
  
  constructor(props: {}) {
    super(props);
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    this.messagesListener = await this.getMessages();
  }
  
  componentWillUnmount() {
    if (this.messagesListener) {
      this.messagesListener();
    }
  }

  addMessage = () => {
    db.collection('messages').add({
      createAt: Date.now(),
      message: 'Yupi!',
      senderID: '2',
      senderName: 'Kamil'
    });
  }

  getMessages = async () => {
    const results = await db.collection("messages")
    return results.onSnapshot(querySnapshot => {
        const messages: any = [];
        querySnapshot.forEach(doc => {
          const newMessage = doc.data();
          messages.push({
            ...newMessage, 
            id: doc.id
          });
        });
        this.setState({ messages });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.addMessage}>Send </button>
        {this.state.messages.map(item => <p key={item.id}>{item.message}</p>)}
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
