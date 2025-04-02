const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { getRecipeSuggestions } = require('./apiRequests');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipeDB';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Recipe suggestion API route
app.post('/api/getRecipeSuggestions', async (req, res) => {
  try {
    console.log('Received recipe request:', req.body);
    const { ingredients } = req.body;

    // Validate ingredients
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      console.log('Invalid ingredients received:', ingredients);
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'Ingredients must be a non-empty array'
      });
    }

    // Call the function from apiRequests.js
    const recipe = await getRecipeSuggestions(ingredients);
    console.log('Successfully generated recipe');
    res.json({ recipe });
  } catch (error) {
    console.error('Error in recipe generation:', {
      message: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      error: 'Failed to generate recipe',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV,
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('OpenAI API configured:', !!process.env.OPENAI_API_KEY);
});
