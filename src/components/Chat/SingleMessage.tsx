import * as React from 'react';
import styled, { StyledComponent } from 'react-emotion';
import MessageInterface from './MessageInterface';

interface IStyledProps {
  own?: boolean;
}

interface IProps extends IStyledProps {
  key?: string;
  data: MessageInterface;
}

const MessageWrapper: StyledComponent<IStyledProps, {}, JSX.IntrinsicElements['div']> = styled('div')`
  margin: 10px 0;
  max-width: 60%;
  text-align: ${props => props.own ? 'right' : 'left'};
  align-self: ${props => props.own ? 'flex-end' : 'flex-start'};
`;

const StyledMessage = styled('div')`
  padding: 20px;
  background: #f3f7f9;
  border-radius: 20px;
  font-size: 14px;
`;

const AuthorName = styled('div')`
  font-size: 12px;
  color: #e2e2e2;
`;

const SingleMessage: React.SFC<IProps> = props => {
  const { data, own } = props;
  return (
    <MessageWrapper own={own}>
      <AuthorName>{data.senderName}</AuthorName>
      <StyledMessage>{data.message}</StyledMessage>
    </MessageWrapper>
  );
}

export default SingleMessage;
