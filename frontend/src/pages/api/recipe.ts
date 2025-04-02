import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface RecipeResponse {
  recipe: string;
}

interface ApiError {
  error: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredients } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Ingredients must be a non-empty array'
      });
    }

    const response = await axios.post<RecipeResponse>(
      'http://localhost:5000/api/getRecipeSuggestions',
      { ingredients },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);
    
    if (error.response?.status === 400) {
      return res.status(400).json({
        error: 'Invalid request',
        message: error.response.data.message
      });
    } else if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'API key is invalid or missing'
      });
    } else if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message || 'Failed to generate recipe'
    });
  }
} 