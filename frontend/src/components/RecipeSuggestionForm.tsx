import { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Fade,
  Container,
} from '@mui/material';
import { getRecipeSuggestions, RecipeApiError } from '../lib/api/recipeApi';

const RecipeSuggestionForm = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredients(event.target.value);
    setError(null);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && ingredients.trim()) {
      event.preventDefault();
      handleAddIngredient();
    }
  };

  const handleAddIngredient = () => {
    const newIngredient = ingredients.trim();
    if (newIngredient && !ingredientList.includes(newIngredient)) {
      setIngredientList([...ingredientList, newIngredient]);
      setIngredients('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredientList(ingredientList.filter((ingredient: string) => ingredient !== ingredientToRemove));
  };

  const handleSubmit = async () => {
    if (ingredientList.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);
    setRecipe('');

    try {
      const generatedRecipe = await getRecipeSuggestions(ingredientList);
      setRecipe(generatedRecipe);
    } catch (err) {
      const error = err as RecipeApiError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
              }}
            >
              Recipe Generator
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Enter your ingredients and let AI create a delicious recipe for you.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 3,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                label="Add an ingredient"
                variant="outlined"
                fullWidth
                value={ingredients}
                onChange={handleIngredientChange}
                onKeyPress={handleKeyPress}
                error={!!error && ingredientList.length === 0}
                helperText={error && ingredientList.length === 0 ? error : ''}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddIngredient}
                disabled={!ingredients.trim()}
                sx={{ 
                  minWidth: { xs: '100%', sm: '120px' },
                  height: { xs: '48px', sm: '56px' },
                }}
              >
                Add
              </Button>
            </Box>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                mb: 3,
                minHeight: '48px',
              }}
            >
              {ingredientList.map((ingredient: string) => (
                <Fade in key={ingredient}>
                  <Chip
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient(ingredient)}
                    color="primary"
                    variant="outlined"
                    sx={{
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                      },
                    }}
                  />
                </Fade>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={loading || ingredientList.length === 0}
              sx={{ 
                mb: 3,
                height: '56px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Generate Recipe'
              )}
            </Button>

            {error && ingredientList.length > 0 && (
              <Fade in>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            {recipe && (
              <Fade in>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    mt: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    borderColor: 'primary.light',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                    }}
                  >
                    Your Recipe
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ 
                      whiteSpace: 'pre-line',
                      color: 'text.primary',
                      lineHeight: 1.8,
                    }}
                  >
                    {recipe}
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RecipeSuggestionForm;
