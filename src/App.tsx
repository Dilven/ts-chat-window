import * as React from 'react';
import styled from 'react-emotion';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
  // withRouter
} from "react-router-dom";
import {AuthProvider, AuthConsumer} from "react-check-auth";
import ChatContainer from 'components/Chat/ChatContainer';
import Login from 'components/Login';

const AppWrapper = styled('div')`
  display: flex;
  justify-content: center;
  background-color: #424d57;
  height: 100vh;
`;

const Header = () => (
  <div>
    <AuthConsumer> 
      {({userInfo}) => ( 
        userInfo ?
          (<Link to='/chats'>chats</Link>) :
          (<a href="/login">Login</a>)
      )}
     </AuthConsumer>
  </div>
);

const Chats = () => {
  return (
    <AuthConsumer>
      {({userInfo, isLoading}) => {
        console.log(userInfo)
        if (isLoading) {
          return <div>Loading...</div>
        }
        if (!userInfo) {
          console.log('not userinfo')
           return (<Redirect to='/login' />);
        }
        console.log('userinfo')
        return (<ChatContainer />);
      }}
    </AuthConsumer>
  );
}


class App extends React.Component {
  render() {
    const reqOptions = { 
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'autorization': 'none',
        'Access-Control-Allow-Origin': '*'
      },  
    }; 

    return (
      <AuthProvider authUrl={`http://localhost:9000/users/me?access_token=${localStorage.getItem('token')}`} reqOptions={reqOptions}>
        <Router>
          <AppWrapper className="Main">
            <Header />
            <Route exact={true} path="/chats" component={Chats} />
            <Route path="/login" component={Login} />
          </AppWrapper>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
