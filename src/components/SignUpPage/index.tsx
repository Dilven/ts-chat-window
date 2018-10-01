import React from 'react';
import ButtonGoogle from 'components/ButtonGoogle';
import Card from 'components/Card'

const SignUpPage: React.SFC<{}> = () => {
  return (
    <Card>
      <p>Log in with one of the following:</p>
      <a href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/auth&response_type=token&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}><ButtonGoogle /></a>
    </Card>
  )
}

export default SignUpPage
