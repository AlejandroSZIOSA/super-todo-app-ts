import { type FC } from "react";

interface MessageListProps {
  message: string;
}

const MessageList: FC<MessageListProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default MessageList;
