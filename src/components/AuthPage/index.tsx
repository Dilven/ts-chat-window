import React, { Component } from 'react'
import axios from 'axios';

import paths from '../../paths.config';

interface IAuthPageProps {
  location: { hash: string },
  history: { push: (url: string) => void }
}

export default class AuthPage extends Component<IAuthPageProps, {}> {
  constructor(props: IAuthPageProps) {
    super(props);
    this.state = {
      fetching: true,
    }
  }
  async componentDidMount() {
    const token = this.props.location.hash.split("access_token=")[1].split("&")[0]
    const config = {
      headers: { 'Authorization': "Bearer " + token }
    };
    try {
      const { data: { user, token: userToken } } = await axios.post(paths.api.authGoogle, {}, config)
      this.setState({ fetching: false })
      localStorage.setItem('userName', user.name || user.email)
      localStorage.setItem('userToken', userToken)
      localStorage.setItem('userId', user.id)
      this.props.history.push("/");
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        laduje......
      </div>
    )
  }
}
