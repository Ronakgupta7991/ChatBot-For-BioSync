import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (text, vitalSigns) => {
        setIsLoading(true);
        const newMessage = {
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);

        try {
            const response = await axios.post(`${API_URL}/chat`, {
                query: text,
                vital_signs: vitalSigns,
            });

            setMessages((prev) => [
                ...prev,
                {
                    text: response.data.response,
                    sender: 'bot',
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                {
                    text: 'Sorry, there was an error processing your request.',
                    sender: 'error',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, sendMessage, isLoading };
};
