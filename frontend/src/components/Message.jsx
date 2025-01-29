import React from 'react';

const Message = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`message ${isUser ? 'user' : 'bot'}`}>
            <p>{message.text}</p>
            <small>{message.timestamp.toLocaleTimeString()}</small>
        </div>
    );
};

export default Message;
