# AI Copilot - Frontend Container

This workspace contains the frontend React application for the AI Copilot chat interface.

## Overview

The AI Copilot is a full-stack web application that enables users to chat with an AI assistant in real-time. This workspace contains the frontend container built with React JS.

## Project Structure

```
ai-chat-assistant-4365/
└── ai_copilot_frontend/     # React frontend application
    ├── src/                 # Source code
    ├── public/              # Static assets
    ├── package.json         # Dependencies
    └── README.md            # Detailed frontend documentation
```

## Quick Start

For detailed setup instructions, environment configuration, and troubleshooting, please refer to:

**📖 [Frontend Documentation](./ai_copilot_frontend/README.md)**

## Running the Frontend

```bash
# Navigate to frontend directory
cd ai_copilot_frontend

# Install dependencies
npm install

# Create .env file with backend URL
echo "REACT_APP_BACKEND_URL=http://localhost:3001" > .env

# Start development server
npm start
```

The frontend will be available at: http://localhost:3000

## Prerequisites

- Node.js 14+
- Backend service running on port 3001

## Environment Variables

Create a `.env` file in `ai_copilot_frontend/` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

See the [Frontend README](./ai_copilot_frontend/README.md) for complete environment configuration.

## Features

- Real-time AI chat interface
- Light/dark theme support (Champagne theme)
- Responsive design for mobile and desktop
- Error handling and loading states
- Seamless backend integration via Axios

## Related Documentation

- **Frontend Details**: [ai_copilot_frontend/README.md](./ai_copilot_frontend/README.md)
- **Backend Setup**: See `ai-chat-assistant-4361` workspace
- **API Documentation**: http://localhost:3001/docs (when backend is running)

## Architecture

- **Platform**: Web
- **Framework**: React 18
- **Styling**: Custom CSS with champagne theme
- **HTTP Client**: Axios
- **Backend Integration**: REST API calls to FastAPI backend

## Development Ports

- **Frontend**: Port 3000
- **Backend**: Port 3001 (separate workspace)

## Support

For questions and issues, refer to the troubleshooting section in the [Frontend README](./ai_copilot_frontend/README.md).
