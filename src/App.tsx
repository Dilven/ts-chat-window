import * as React from 'react';
import styled from 'react-emotion';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router';
import ChatContainer from './components/Chat/ChatContainer';
import AuthPage from './components/AuthPage';

const AppWrapper = styled('div')`
  display: flex;
  justify-content: center;
  background-color: #424d57;
  height: 100vh;
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <AppWrapper className="Main">
          <Switch>
            <Route exact={true} path="/" component={ChatContainer} />
            <Route exact={true} path="/auth" component={AuthPage} />
          </Switch>
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
