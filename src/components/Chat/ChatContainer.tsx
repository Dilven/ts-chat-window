import * as React from 'react';
import db from '../../firebase';
import Button from '../Button';
import ChatFooter from './ChatFooter';
import ChatWindow from './ChatWindow';
import IMessage from './MessageInterface';
import MessagesList from './MessagesList';
import SingleMessage from './SingleMessage';

interface IState {
  messages: IMessage[]
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
          {this.state.messages.map((item, index) => <SingleMessage own={index%2 === 0} key={item.id} data={item} />)}
        </MessagesList>
        <ChatFooter>
          <Button onClick={this.addMessage}>Send </Button>
        </ChatFooter>
      </ChatWindow>
    );
  }
}

export default App;
