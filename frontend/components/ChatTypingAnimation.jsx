import "../styles/ChatTypingAnimation.css"
const ChatBubble = () => {
  return (
    <div className="chat-bubble p-2">
      <div className="typing flex">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default ChatBubble;