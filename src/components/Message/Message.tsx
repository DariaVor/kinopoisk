import s from './Message.module.css';

const Message: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={s.message}>{children}</div>;
};
export default Message;
