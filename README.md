# AI Recipe Generator

A full-stack application that generates recipes using AI based on available ingredients.

## Project Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/          # Node.js backend server
└── README.md         # This file
```

## Features

- AI-powered recipe generation
- Modern, responsive UI
- Real-time ingredient input
- Beautiful animations and transitions
- Type-safe development

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Material-UI v5
- Emotion
- Axios

### Backend
- Node.js
- Express
- MongoDB
- OpenAI API
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
