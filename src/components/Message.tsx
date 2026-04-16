import { type FC } from "react";

interface MessageProps {
  message: string;
}

const Message: FC<MessageProps> = ({ message }) => {
  return <h3>{message}</h3>;
};

export default Message;
