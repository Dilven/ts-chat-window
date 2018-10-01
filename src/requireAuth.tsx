import React, { Component, Fragment } from 'react';
import SignUpPage from 'components/SignUpPage';

interface IAuthenticateState {
  isLogged: boolean
}

interface IAuthenticateProps {
  location: { hash: string }
}
export default function (ComposedComponent: React.ComponentType): React.ComponentType {
  return class Authenticate extends Component<IAuthenticateProps, IAuthenticateState> {
    constructor(props: IAuthenticateProps) {
      super(props);
      this.state = {
        isLogged: false,
      }
    }

    componentDidMount() {
      if (localStorage.userName) {
        this.setState({ isLogged: true })
      }
    }

    render() {
      return (
        <Fragment>
          {this.state.isLogged ?
            <ComposedComponent />
            :
            <SignUpPage />
          }
        </Fragment>
      )
    }
  }
}
