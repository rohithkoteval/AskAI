"use client"
import React, { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const askTheAI = async () => {
    try {
      // Disable the button
      setIsButtonDisabled(true);

      // Add the user's message to the message history
      setMessageHistory(prevHistory => [...prevHistory, `User: ${message}`]);

      // Make the API call to the AI
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });
      const data = await response.json();

      // Add the AI's response to the message history
      setMessageHistory(prevHistory => [...prevHistory, `AI: ${data.response}`]);

      // Clear the input field after sending the message
      setMessage('');

      // Enable the button
      setIsButtonDisabled(false);
    } catch (error) {
      console.error('Error asking the AI:', error);
      // Enable the button in case of error
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="max-w-lg w-full mx-auto p-8 bg-whi rounded-lg shadow-lg">
        {/* Conversation history */}
        <div className="mb-4">
          {/* Display message history */}
          {messageHistory.map((msg, index) => (
            <textarea 
              key={index} 
              value={msg} 
              readOnly 
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg resize-none" 
            />
          ))}
        </div>
        
        {/* Big text area */}
        <textarea 
          className="w-full h-40 px-4 py-2 mb-4 border border-gray-300 rounded-lg resize-none" 
          placeholder="Type your message here"
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
        
        {/* Button */}
        <button 
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={askTheAI}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? 'Processing...' : 'Ask the AI'}
        </button>
      </div>
    </div>
  );
}
