import React, { useState } from 'react';
import Message from './Message';
import VitalSigns from './VitalSigns';
import { useChat } from '../hooks/useChat';

const ChatInterface = () => {
    const [input, setInput] = useState('');
    const { messages, sendMessage, isLoading } = useChat();
    const [vitalSigns, setVitalSigns] = useState({
        heart_rate: 75,
        spo2: 98,
        temperature: 36.8
    });

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        await sendMessage(input, vitalSigns);
        setInput('');
    };

    return (
        <div className="chat-container">
            <VitalSigns 
                vitalSigns={vitalSigns} 
                onChange={setVitalSigns} 
            />
            <div className="messages">
                {messages.map((msg, idx) => (
                    <Message key={idx} message={msg} />
                ))}
                {isLoading && (
                    <div className="typing-indicator">
                        Bot is typing...
                    </div>
                )}
            </div>
            <div className="input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your health query..."
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;