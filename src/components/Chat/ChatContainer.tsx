import * as React from 'react';
import db from '../../firebase';
import Button from '../Button';
import ChatFooter from './ChatFooter';
import ChatWindow from './ChatWindow';
import IMessage from './MessageInterface';
import MessagesList from './MessagesList';
import SingleMessage from './SingleMessage';
import TextArea from '../TextArea';
import KeyCodeEnum from './KeyCodeEnum';

interface IState {
  messages: IMessage[];
  newMessage: string;
  isScrolledInitially: boolean;
}

// interface IProps {}

class App extends React.Component<{}, IState> {
  messagesListener: any = null;
  messagesListRef: React.RefObject<HTMLDivElement> = React.createRef();
  
  constructor(props: {}) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
      isScrolledInitially: false
    }
  }

  async componentDidMount() {
    this.messagesListener = await this.getMessages();
    document.addEventListener('keydown', this.onEnterPress);
  }
  
  componentWillUnmount() {
    if (this.messagesListener) {
      this.messagesListener();
    }

    document.removeEventListener('keydown', this.onEnterPress)
  }

  addMessage = async () => {
    await db.collection('messages').add({
      createAt: Date.now(),
      message: this.state.newMessage,
      senderID: '2',
      senderName: 'Kamil'
    });
    this.setState({
      newMessage: ''
    })
    this.scrollToBottom(true)
  }

  onEnterPress = (e: KeyboardEvent) => {
    if (e.keyCode === KeyCodeEnum.Enter) {
      e.preventDefault();
      this.addMessage()
    }
  }

  onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    this.setState({
      newMessage: value
    })
  }

  getMessages = async () => {
    const results = await db.collection("messages").orderBy("createAt", "asc")
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
        this.scrollToBottom();
      });
  }

  scrollToBottom = (force = false) => {
    if (!this.state.isScrolledInitially || force) {
      if (this.messagesListRef && this.messagesListRef.current) {
        const { scrollHeight } = this.messagesListRef.current;
        this.messagesListRef.current.scrollTop = scrollHeight;
        this.setState({
          isScrolledInitially: true
        })
      }
    }
  }

  render() {
    return (
      <ChatWindow>
        <MessagesList innerRef={this.messagesListRef}>
          {this.state.messages.map((item, index) => <SingleMessage own={index%2 === 0} key={item.id} data={item} />)}
        </MessagesList>
        <ChatFooter>
          <TextArea value={this.state.newMessage} onChange={this.onNewMessageChange} />
          <Button onClick={this.addMessage}>Send </Button>
        </ChatFooter>
      </ChatWindow>
    );
  }
}

export default App;
