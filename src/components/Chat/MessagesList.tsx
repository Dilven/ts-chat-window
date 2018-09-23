import styled from 'react-emotion';

const MessagesList = styled('ul')`
  padding: 20px;
  height: calc(100vh - 200px);
  overflow: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

export default MessagesList;
