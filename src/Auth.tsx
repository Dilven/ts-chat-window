import React from 'react';
import styled from 'react-emotion';
import Button from 'components/Button'

const StyledAuthForm = styled('form')`
  box-shadow: 0 0 20px 4px #4384f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  font-family:'Roboto';
  margin: auto;
  background-color: #fff;
  padding: 5px;
`;

const StyledInput = styled('input')`
  font-size:18px;
  display: block;
  padding:10px 10px 10px 5px;
  margin: 5px;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
  &:focus {
    outline:none;
  }
  &:focus ~ label {
    top:-20px;
    font-size:14px;
    color:#5264AE;
  }
`
const Label = styled('label')`
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
`

const Group = styled('div')`
  position:relative; 
  margin-top:45px;
  margin-bottom:45px;
`
const Bar = styled('span')`
  position:relative;
  display:block;
  width:300px;
  &:before, .bar:after 	{
    content:'';
    height:2px; 
    width:0;
    bottom:1px; 
    position:absolute;
    background:#5264AE; 
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }
  &:before {
    left:50%;
  }
  &:after {
    right:50%; 
  }
`
const Header = styled('h2')`
  text-align:center; 
  margin-bottom:30px; 
`

const AuthForm: React.SFC<{ singIn: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ singIn }) => {
  return (
      <StyledAuthForm onSubmit={(e) => singIn(e)}>
        <Header>Sign in</Header>
        <Group>
          <StyledInput name="username" type="text"/>
          <Label>Username</Label>
          <Bar/>
        </Group>
        <Button type="submit">Submit</Button>
        New to Chat-ts? Create an account.
      </StyledAuthForm>   
  )
}

export default AuthForm
