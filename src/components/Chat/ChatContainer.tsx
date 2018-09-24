import * as React from 'react';
import db from 'services/firebase';
import notificationService from 'services/notificationService';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import ChatFooter from './ChatFooter';
import ChatWindow from './ChatWindow';
import IMessage from './MessageInterface';
import MessagesList from './MessagesList';
import SingleMessage from './SingleMessage';
import KeyCodeEnum from './KeyCodeEnum';

interface IState {
  messages: {
    [key: string]: IMessage
  };
  newMessage: string;
  prevSrollHeight?: number;
}

// interface IProps {}

class App extends React.Component<{}, IState> {
  messagesListener: any = null;
  messagesListRef: React.RefObject<HTMLDivElement> = React.createRef();
  
  constructor(props: {}) {
    super(props);
    this.state = {
      messages: {},
      newMessage: '',
      prevSrollHeight: undefined
    }
  }

  async componentDidMount() {
    this.messagesListener = await this.getMessages();
    this.scrollToBottom(true);
    document.addEventListener('keydown', this.onEnterPress);

    notificationService.requestDesktopNotificationPermission()
  }
  
  componentWillUnmount() {
    if (this.messagesListener) {
      this.messagesListener();
    }

    document.removeEventListener('keydown', this.onEnterPress)
  }

  addMessage = async () => {
    if (this.state.newMessage) {
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
        if (this.messagesListRef && this.messagesListRef.current) {
          this.setState({
            prevSrollHeight: this.messagesListRef.current.scrollHeight
          })
        }
        const newMessages = {};
        querySnapshot.forEach(doc => {
          const { id } = doc
          const message = doc.data(); 
          if (!this.state.messages[id]) {
            newMessages[id] = { ...message, id }
          }
        });

        if (Object.keys(this.state.messages).length !== 0 && Object.keys(newMessages).length > 0)  {
          const lastMessageAuthor = Object.keys(newMessages).map(key => newMessages[key].senderName)
          notificationService.desktopNotification({content: `New message from ${lastMessageAuthor}`});
        }

        this.setState({ messages: {...this.state.messages, ...newMessages }}, this.scrollToBottom);
      });
  }

  mapMessages = (messages: {[key: string]: IMessage}) => {
    return Object.keys(messages).map(key => messages[key])
  }

  checkIfManuallyScrolled = () => {
    if (this.messagesListRef && this.messagesListRef.current) {
      const { prevSrollHeight } = this.state;
      const { scrollHeight, clientHeight, scrollTop } = this.messagesListRef.current;
      if (scrollTop !== (prevSrollHeight || scrollHeight) - clientHeight) {
        return true;
      }
      return false;
    }
    return true;
  }

  scrollToBottom = (force = false) => {
    if (force || !this.checkIfManuallyScrolled()) {
      if (this.messagesListRef && this.messagesListRef.current) {
        const { scrollHeight, clientHeight } = this.messagesListRef.current;
        this.messagesListRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }
  }

  render() {
    return (
      <ChatWindow>
        <MessagesList innerRef={this.messagesListRef}>
          {this.mapMessages(this.state.messages).map((item, index) => (
            <SingleMessage own={index%2 === 0} key={item.id} data={item} />
          ))}
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
