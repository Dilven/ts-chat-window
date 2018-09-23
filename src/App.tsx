import * as React from 'react';
import styled from 'react-emotion';
import ChatContainer from './components/Chat/ChatContainer';

const AppWrapper = styled('div')`
  display: flex;
  justify-content: center;
  background-color: #424d57;
`;

class App extends React.Component {
  render() {
    return (
      <AppWrapper className="Main">
        <ChatContainer />
      </AppWrapper>
    );
  }
}

export default App;
