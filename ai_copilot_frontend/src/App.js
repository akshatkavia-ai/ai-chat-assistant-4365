import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { sendMessage } from './services/chatService';

/**
 * Main App component for AI Copilot chat interface
 * Provides a single-page chat UI with message history, loading states, and error handling
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Toggle between light and dark themes
   */
  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Handle form submission and send message to AI
   */
  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message to chat
    const newUserMessage = {
      role: 'user',
      content: userMessage
    };
    setMessages(prev => [...prev, newUserMessage]);

    // Set loading state
    setIsLoading(true);

    try {
      // Call the backend API
      const aiResponse = await sendMessage(userMessage);

      // Add AI response to chat
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      // Show error toast
      setError(err.message || 'Failed to get response from AI');
      
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      <header className="chat-header">
        <h1 className="chat-title">AI Copilot</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="chat-container">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>Welcome to AI Copilot</h2>
              <p>Ask me anything and I'll help you out!</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role}`}
            >
              <div className="message-bubble">
                <div className="message-content">{message.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-bubble loading">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="input-container" onSubmit={handleSubmit}>
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </main>

      {error && (
        <div className="error-toast">
          <span className="error-message">{error}</span>
          <button className="error-close" onClick={clearError}>×</button>
        </div>
      )}
    </div>
  );
}

export default App;
