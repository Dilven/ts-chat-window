import * as React from 'react';
import db from '../../firebase';
import ChatWindow from './ChatWindow';
import MessagesList from './MessagesList';

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
      <ChatWindow>
        <MessagesList>
          {this.state.messages.map(item => <p key={item.id}>{item.message}</p>)}
        </MessagesList>
        <button onClick={this.addMessage}>Send </button>
      </ChatWindow>
    );
  }
}

export default App;
