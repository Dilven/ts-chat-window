import React from 'react';
import moment from 'moment';
import styled, { StyledComponent } from 'react-emotion';
import MessageInterface from './MessageInterface';

interface IStyledProps {
  own?: boolean;
}

interface IProps extends IStyledProps {
  key?: string;
  data: MessageInterface;
}

const MessageWrapper: StyledComponent<IStyledProps, {}, JSX.IntrinsicElements['li']> = styled('li')`
  margin: 10px 0;
  max-width: 60%;
  list-style: none;
  text-align: ${props => props.own ? 'right' : 'left'};
  align-self: ${props => props.own ? 'flex-end' : 'flex-start'};
`;

const StyledMessage = styled('div')`
  padding: 20px;
  background: #f3f7f9;
  border-radius: 20px;
  font-size: 14px;
`;

const AdditionalInfo = styled('div')`
  font-size: 12px;
  color: #424d57;
  opacity: 0.7;
  font-weight: 700;
`;

const CreateDate = styled('div')`
  color: #424d57;
  opacity: 0.5;
  font-weight: 300;
`;

const SingleMessage: React.SFC<IProps> = props => {
  const { data, own } = props;
  return (
    <MessageWrapper own={own}>
      <AdditionalInfo>
        {data.senderName}
        <CreateDate>{moment(data.createAt).fromNow()}</CreateDate>
      </AdditionalInfo>
      <StyledMessage>{data.message}</StyledMessage>
    </MessageWrapper>
  );
}

export default SingleMessage;
