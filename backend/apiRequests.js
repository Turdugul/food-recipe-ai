const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to get recipe suggestions from OpenAI API
const getRecipeSuggestions = async (ingredients, retryCount = 0) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Recipe using: ${ingredients.join(', ')}` }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    if (error.response?.status === 429 && retryCount < 3) {
      console.log(`Rate limit exceeded. Retrying in 30 seconds... (Attempt ${retryCount + 1})`);
      await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
      return getRecipeSuggestions(ingredients, retryCount + 1);
    }

    throw new Error(`Failed to generate recipe: ${error.message}`);
  }
};


module.exports = {
  getRecipeSuggestions,
};
