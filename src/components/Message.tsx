import { type FC } from "react";

interface MessageProps {
  message: string;
}

const Message: FC<MessageProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default Message;
