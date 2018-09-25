import * as React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import authService from '../../authService';

class Login extends React.Component {
  render() {
    const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
    return (
      <div>
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_CLIENT_ID || ''}
          buttonText="Login"
          onSuccess={authService.login}
          onFailure={response => console.log(response)}
        />
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={authService.signout}
        />
      </div>
    );
  }
}

export default Login;
