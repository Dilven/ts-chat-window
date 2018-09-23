import React, { Component } from 'react';
import Auth from './Auth';

interface IState {
  isLogged: boolean
}

export default function<P, IState>(ComposedComponent: React.ComponentType<P>): React.ComponentType<P> {
  class Authenticate extends Component<P> {
    constructor(props: P) {
      super(props);
      this.state = {
        isLogged: false,
      }
    }

    componentWillMount() {
      if(localStorage.userID) {
        this.setState({isLogged: true})
      }
    }

    render() {
      return (
        {this.state.isLogged ? 
          <ComposedComponent/>
          :
          <Auth />
        }
      )
    }
  }
}
