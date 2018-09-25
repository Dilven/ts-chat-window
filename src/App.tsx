import * as React from 'react';
import styled from 'react-emotion';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
  // withRouter
} from "react-router-dom";
import ChatContainer from 'components/Chat/ChatContainer';
import Login from 'components/Login';
import authService from './authService';

const AppWrapper = styled('div')`
  display: flex;
  justify-content: center;
  background-color: #424d57;
  height: 100vh;
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  componentDidMount() {
    authService.check()
  }

  render() {
    return (
      <Router>
        <AppWrapper className="Main">
          <ul>
            <li>
              <Link to="/">Chats Page</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
          </ul>
          <PrivateRoute exact={true} path="/" component={ChatContainer} />
          <Route path="/login" component={Login} />
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
