# Recipe Generator Frontend

A modern React application built with Next.js, TypeScript, and Material-UI for generating recipes using AI.

## Features

- Modern, responsive design
- Real-time ingredient input
- AI-powered recipe generation
- Beautiful UI with animations
- Type-safe development with TypeScript

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Material-UI v5
- Emotion (for styled components)
- Axios (for API calls)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Next.js pages
│   ├── lib/           # Utility functions and API clients
│   ├── theme/         # Material-UI theme configuration
│   └── styles/        # Global styles
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
