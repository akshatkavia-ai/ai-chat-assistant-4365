import axios from 'axios';

// Get backend URL from environment variable or default to localhost:3001
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

/**
 * Send a message to the AI chat backend
 * 
 * @param {string} text - The user's message text
 * @returns {Promise<string>} The AI's response message
 * @throws {Error} If the request fails or returns an error
 */
// PUBLIC_INTERFACE
export async function sendMessage(text) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/chat`, {
      message: text
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout for AI responses
    });

    // Check if the response contains an error field
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    // Return the AI's reply
    return response.data.reply || 'No response from AI';
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status
      const errorMessage = error.response.data?.error 
        || error.response.data?.detail 
        || `Server error: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to reach the server. Please check your connection.');
    } else {
      // Something else went wrong
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}
