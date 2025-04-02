import axios, { AxiosError } from 'axios';

interface RecipeResponse {
  recipe: string;
}

interface RecipeRequest {
  ingredients: string[];
}

interface ApiError {
  error: string;
  message?: string;
}

export class RecipeApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RecipeApiError';
  }
}

const API_BASE_URL = 'http://localhost:5000';

export const getRecipeSuggestions = async (ingredients: string[]): Promise<string> => {
  try {
    console.log('Sending recipe request with ingredients:', ingredients);
    const response = await axios.post<RecipeResponse>(
      `${API_BASE_URL}/api/getRecipeSuggestions`,
      { ingredients },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Received recipe response');
    return response.data.recipe;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    console.error('Error details:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message
    });
    
    if (axiosError.response?.status === 400) {
      throw new RecipeApiError(axiosError.response.data.message || 'Invalid request');
    } else if (axiosError.response?.status === 401) {
      throw new RecipeApiError('API key is invalid or missing');
    } else if (axiosError.response?.status === 429) {
      throw new RecipeApiError('Rate limit exceeded. Please try again later.');
    } else if (axiosError.response?.status === 500) {
      throw new RecipeApiError(axiosError.response.data.message || 'Server error occurred');
    }
    
    throw new RecipeApiError(
      axiosError.response?.data?.message || 
      axiosError.message || 
      'Failed to fetch recipe suggestions'
    );
  }
}; 