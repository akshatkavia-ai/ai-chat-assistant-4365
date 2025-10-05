# AI Copilot Frontend

A modern React-based chat interface for interacting with the AI Copilot. Features an elegant champagne-themed UI with light/dark mode support, real-time messaging, and seamless integration with the FastAPI backend.

## Project Overview

The AI Copilot Frontend is a single-page React application that provides an intuitive chat interface for users to communicate with an AI assistant. Built with React 18 and featuring a custom champagne-themed design, it offers a smooth, responsive experience with real-time message updates and comprehensive error handling.

## Prerequisites

Before setting up the frontend, ensure you have the following installed:

- **Node.js 14+** (Node.js 16 or higher recommended)
- **npm 6+** or **yarn 1.22+**
- **Backend Service**: The AI Copilot Backend must be running (see backend README)

## Environment Variables

The frontend requires environment variables to connect to the backend service. These should be configured in a `.env` file located in the `ai_copilot_frontend/` directory.

### Required Environment Variables

- **`REACT_APP_BACKEND_URL`** (Required): URL of the backend API service
  - Development: `http://localhost:3001`
  - Production: Your deployed backend URL
  - Format: `http://hostname:port` (no trailing slash)

### Optional Environment Variables (Future Use)

- **`REACT_APP_SUPABASE_URL`** (Optional): Supabase project URL for future authentication and persistence features
  - Format: `https://your-project.supabase.co`
  
- **`REACT_APP_SUPABASE_KEY`** (Optional): Supabase anonymous key for client-side operations
  - Format: String value from Supabase project settings

### Sample .env File

Create a file named `.env` in the `ai_copilot_frontend/` directory with the following content:

```env
# Required: Backend API URL
REACT_APP_BACKEND_URL=http://localhost:3001

# Optional: Supabase configuration (for future features)
# REACT_APP_SUPABASE_URL=https://your-project.supabase.co
# REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

**⚠️ Security Warning**: 
- **Never commit your `.env` file to version control**
- Add `.env` to your `.gitignore` file
- Only use anonymous/public keys in frontend environment variables
- Keep sensitive keys on the backend only
- Use different configuration for development and production

### Example .env for Different Environments

**Development (.env.development)**:
```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

**Production (.env.production)**:
```env
REACT_APP_BACKEND_URL=https://api.yourapp.com
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

## Installation and Running

### Step 1: Navigate to Frontend Directory

```bash
cd ai-chat-assistant-4365/ai_copilot_frontend
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Create .env File

Create a `.env` file in the `ai_copilot_frontend/` directory (see sample above) and configure your `REACT_APP_BACKEND_URL`.

### Step 4: Start the Development Server

```bash
# Using npm
npm start

# Or using yarn
yarn start
```

The frontend will start on **port 3000** by default and automatically open in your browser.

- Local URL: http://localhost:3000
- Network URL: http://your-ip:3000

### Other Available Scripts

#### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder. The build is minified and ready for deployment.

#### Run Tests

```bash
# Interactive mode
npm test

# CI mode (non-interactive)
CI=true npm test

# With coverage
npm test -- --coverage
```

#### Eject Configuration (Not Recommended)

```bash
npm run eject
```

**Note**: This is a one-way operation. Once you eject, you can't go back!

### Preview Environment

**Note**: In the Kavia preview system, services are started automatically. The frontend will be available at:
- Local: `http://localhost:3000`
- Preview URL: Provided by the Kavia platform

Both frontend (port 3000) and backend (port 3001) are started automatically in the preview environment.

## Features

### Chat Interface

- **Real-time Messaging**: Send messages and receive AI responses instantly
- **Message History**: View complete conversation history in the current session
- **Loading States**: Visual feedback while AI generates responses
- **Error Handling**: User-friendly error messages with auto-dismiss

### Theme Support

- **Light Mode**: Elegant champagne theme with warm tones
- **Dark Mode**: Professional dark theme for low-light environments
- **Theme Toggle**: Easy switch between light and dark modes
- **Persistent Theme**: Theme preference maintained during session

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Auto-scroll**: Automatically scrolls to latest messages
- **Input Validation**: Prevents sending empty messages
- **Keyboard Support**: Send messages with Enter key
- **Accessibility**: ARIA labels and semantic HTML

### Design Elements

The frontend features a custom champagne-themed design system:

- **Primary Color**: `#D97706` (Amber/Gold)
- **Background**: `#FFFBEB` (Light Cream)
- **Surface**: `#FFFFFF` (White)
- **Text**: `#374151` (Dark Gray)
- **Elegant Styling**: Rounded corners, smooth transitions, subtle shadows

## Frontend Usage

### Basic Usage

1. **Start the Application**: Open http://localhost:3000 in your browser
2. **Type a Message**: Enter your question or message in the input box
3. **Send**: Click "Send" button or press Enter
4. **View Response**: The AI's response appears in the chat window
5. **Continue Conversation**: Send more messages to continue chatting

### Keyboard Shortcuts

- **Enter**: Send the current message
- **Tab**: Navigate between input field and buttons

### Theme Toggle

Click the theme toggle button in the header to switch between light and dark modes:
- **Light Mode**: ☀️ Light button
- **Dark Mode**: 🌙 Dark button

### Error Messages

If an error occurs, a red toast notification appears at the bottom of the screen with:
- Error description
- Close button (×)
- Auto-dismiss after 5 seconds

## API Integration

The frontend communicates with the backend using Axios through the `chatService.js` module.

### Chat Service (`src/services/chatService.js`)

**Function**: `sendMessage(text)`

Sends a user message to the backend and returns the AI response.

**Parameters**:
- `text` (string): User's message

**Returns**: 
- Promise<string>: AI's response text

**Throws**: 
- Error: If request fails or backend returns an error

**Example Usage**:
```javascript
import { sendMessage } from './services/chatService';

try {
  const response = await sendMessage('Hello, AI!');
  console.log(response); // "Hello! How can I assist you today?"
} catch (error) {
  console.error(error.message);
}
```

### Configuration

The backend URL is configured via the `REACT_APP_BACKEND_URL` environment variable:

```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
```

**Default**: `http://localhost:3001` if not specified

### Request Format

```javascript
POST http://localhost:3001/api/chat
Content-Type: application/json

{
  "message": "User's message text"
}
```

### Response Format

**Success**:
```json
{
  "reply": "AI's response text",
  "error": null
}
```

**Error**:
```json
{
  "error": "Error message"
}
```

## Troubleshooting

### Issue: "Unable to reach the server"

**Symptoms**: Error message appears when sending messages, stating connection failure.

**Cause**: The backend service is not running or not accessible.

**Solution**:
1. Verify the backend is running on port 3001:
   ```bash
   curl http://localhost:3001/
   ```
   Should return: `{"status":"ok"}`

2. Check the `.env` file has the correct `REACT_APP_BACKEND_URL`

3. Restart the backend service:
   ```bash
   cd ai-chat-assistant-4361/ai_copilot_backend
   uvicorn src.api.main:app --reload --host 0.0.0.0 --port 3001
   ```

4. Restart the frontend after changing `.env`:
   ```bash
   npm start
   ```

---

### Issue: CORS Errors

**Symptoms**: Browser console shows "Access to XMLHttpRequest has been blocked by CORS policy"

**Cause**: The backend's CORS configuration doesn't allow the frontend origin.

**Solution**:

1. **Check Backend CORS Settings**: The backend should allow `http://localhost:3000` by default

2. **If Using Custom Domain**: Add it to backend's `.env`:
   ```env
   FRONTEND_ORIGIN=https://your-custom-domain.com
   ```

3. **Restart Backend**: Changes to backend `.env` require restart

4. **Verify Allowed Origins**: Check `ai_copilot_backend/src/api/main.py` includes your origin in `allowed_origins`

5. **Browser Cache**: Clear browser cache and hard reload (Ctrl+Shift+R)

---

### Issue: Missing GEMINI_API_KEY Error

**Symptoms**: Error message from backend stating missing API key.

**Cause**: Backend `.env` file is missing the `GEMINI_API_KEY`.

**Solution**:
1. Navigate to backend directory: `cd ai-chat-assistant-4361/ai_copilot_backend`
2. Create or edit `.env` file
3. Add your Gemini API key: `GEMINI_API_KEY=your_key_here`
4. Restart the backend service
5. Refresh the frontend

See the backend README for details on obtaining a Gemini API key.

---

### Issue: Environment Variables Not Loading

**Symptoms**: Backend URL shows as `http://localhost:3001` even though `.env` specifies different URL.

**Cause**: React doesn't automatically reload environment variables.

**Solution**:
1. Stop the development server (Ctrl+C)
2. Verify `.env` file is in `ai_copilot_frontend/` directory
3. Verify variable names start with `REACT_APP_`
4. Restart the development server: `npm start`

**Note**: Changes to `.env` require a restart of the development server.

---

### Issue: Port 3000 Already in Use

**Symptoms**: Error message "Something is already running on port 3000"

**Solution**:

**Option 1 - Use Different Port**:
```bash
PORT=3002 npm start
```

**Option 2 - Kill Process**:
```bash
# On Linux/Mac:
lsof -i :3000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Issue: Blank Screen or White Screen

**Symptoms**: Application shows a blank/white screen instead of the chat interface.

**Cause**: JavaScript error preventing React from rendering.

**Solution**:
1. Open browser console (F12) and check for errors
2. Common fixes:
   - Clear browser cache and hard reload
   - Delete `node_modules` and reinstall: `npm install`
   - Check for missing dependencies: `npm install axios react react-dom react-scripts`
3. Verify all required files exist in `src/` directory

---

### Issue: Messages Not Appearing

**Symptoms**: Messages are sent but don't appear in the chat window.

**Cause**: State management issue or API response problem.

**Solution**:
1. Check browser console for errors
2. Verify backend is returning proper responses:
   ```bash
   curl -X POST http://localhost:3001/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"test"}'
   ```
3. Check network tab in browser DevTools for API responses
4. Refresh the page to reset state

## Project Structure

```
ai_copilot_frontend/
├── public/
│   ├── index.html              # HTML template
│   └── ...                     # Static assets
├── src/
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application styles (champagne theme)
│   ├── App.test.js             # Component tests
│   ├── index.js                # Application entry point
│   ├── index.css               # Global styles
│   ├── setupTests.js           # Test configuration
│   └── services/
│       └── chatService.js      # Backend API integration
├── .env                        # Environment variables (create this)
├── package.json                # Dependencies and scripts
├── eslint.config.mjs           # ESLint configuration
└── README.md                   # This file
```

## Customization

### Changing Colors

The color scheme is defined in CSS variables in `src/App.css`:

```css
:root {
  --primary: #D97706;           /* Main accent color */
  --secondary: #F3F4F6;         /* Secondary background */
  --success: #10B981;           /* Success state */
  --error: #EF4444;             /* Error state */
  --background: #FFFBEB;        /* Page background */
  --surface: #FFFFFF;           /* Card background */
  --text-primary: #374151;      /* Main text */
  --text-secondary: #6B7280;    /* Secondary text */
  --border-color: #E5E7EB;      /* Border color */
}
```

For dark mode, update `[data-theme="dark"]` section.

### Adding New Components

1. Create component file in `src/components/`
2. Import and use in `App.js`
3. Add corresponding styles in `App.css` or create component-specific CSS

### Modifying API Requests

Edit `src/services/chatService.js` to:
- Change request format
- Add headers
- Modify timeout
- Add request/response interceptors

## Testing

### Running Tests

```bash
# Interactive mode
npm test

# CI mode (for automated testing)
CI=true npm test

# With coverage report
npm test -- --coverage
```

### Writing Tests

Tests use Jest and React Testing Library. Example test:

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat interface', () => {
  render(<App />);
  const titleElement = screen.getByText(/AI Copilot/i);
  expect(titleElement).toBeInTheDocument();
});
```

## Deployment

### Building for Production

```bash
npm run build
```

This creates a `build/` directory with optimized production files.

### Deployment Options

**Static Hosting** (Recommended):
- **Netlify**: Drag and drop `build/` folder
- **Vercel**: Connect GitHub repository
- **AWS S3 + CloudFront**: Upload to S3, serve via CloudFront
- **GitHub Pages**: Use `gh-pages` package

**Server Deployment**:
- **nginx**: Serve `build/` directory as static files
- **Apache**: Configure `.htaccess` for SPA routing
- **Node.js**: Use `serve` package: `npx serve -s build`

### Environment Variables in Production

Set environment variables in your hosting platform:

**Netlify/Vercel**:
- Go to Site Settings → Environment Variables
- Add `REACT_APP_BACKEND_URL=https://your-api.com`

**Docker**:
```dockerfile
ENV REACT_APP_BACKEND_URL=https://your-api.com
```

## Future Enhancements

### Supabase Integration (Planned)

Future versions will integrate Supabase for:

- **User Authentication**: Sign up, login, logout functionality
- **Chat History Persistence**: Save conversations to database
- **Multi-device Sync**: Access chats from any device
- **User Profiles**: Customize user experience

**Environment Variables** (when implemented):
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

**Implementation Steps**:
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Create authentication components
3. Add database models for chat history
4. Implement real-time subscriptions
5. Add user profile management

### Other Planned Features

- **Message Persistence**: Save chat history locally (localStorage) or cloud (Supabase)
- **Conversation Management**: Create, delete, and manage multiple conversations
- **Rich Text Support**: Markdown rendering for formatted messages
- **Code Syntax Highlighting**: Display code blocks with syntax highlighting
- **File Attachments**: Upload and analyze documents or images
- **Voice Input**: Speech-to-text for message input
- **Export Conversations**: Download chat history as text or PDF
- **User Preferences**: Customize theme, font size, and behavior
- **Typing Indicators**: Show when AI is generating response
- **Message Reactions**: Like, dislike, or flag messages

### Third-Party Integrations

- **Analytics**: Google Analytics or Mixpanel for usage tracking
- **Error Tracking**: Sentry for production error monitoring
- **Performance Monitoring**: Web Vitals and Lighthouse metrics

## Dependencies

Key dependencies (see `package.json` for complete list):

- **react** (^18.2.0): JavaScript library for building user interfaces
- **react-dom** (^18.2.0): React package for DOM rendering
- **react-scripts** (^5.0.1): Configuration and scripts for Create React App
- **axios** (^1.6.0): Promise-based HTTP client for API requests

Development dependencies:
- **cross-env** (^7.0.3): Cross-platform environment variable setting

## Browser Support

The application supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: Optimized for 90+ performance score
- **Bundle Size**: Minimal dependencies for fast loading
- **Code Splitting**: Automatic via Create React App
- **Asset Optimization**: Images and assets optimized in build

## Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading structure

## Support and Resources

- **React Documentation**: https://reactjs.org/
- **Create React App**: https://create-react-app.dev/
- **Axios Documentation**: https://axios-http.com/
- **MDN Web Docs**: https://developer.mozilla.org/

## Contributing

When contributing to this project:
1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Test on multiple browsers
5. Ensure accessibility standards

## License

This project is part of the AI Copilot application suite.
