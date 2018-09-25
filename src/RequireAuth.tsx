import React, { Component, Fragment } from 'react';
import Auth from './Auth';

interface IAuthenticateState {
  isLogged: boolean
}

export default function(ComposedComponent: React.ComponentType): React.ComponentType {
  return class Authenticate extends Component<{}, IAuthenticateState> {
    constructor(props: {}) {
      super(props);
      this.state = {
        isLogged: false,
      }
    }

    componentWillMount() {
      if(localStorage.username) {
        this.setState({isLogged: true})
      }
    }
    
    handleSingIn = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const username = e.currentTarget[0].value
      localStorage.setItem('username', username);
      this.setState({ isLogged: true })
    }

    render() {
      return (
        <Fragment>
          {this.state.isLogged ? 
            <ComposedComponent/>
            :
            <Auth singIn={this.handleSingIn}/>
          }
        </Fragment>
      )
    }
  }
}
