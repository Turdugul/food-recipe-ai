import { Container, Typography, Box, Paper, Fade } from '@mui/material';
import RecipeSuggestionForm from '../components/RecipeSuggestionForm';

const Home = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, sm: 8 },
          mb: { xs: 4, sm: 6 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(46,125,50,0.8) 0%, rgba(76,175,80,0.8) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in timeout={1000}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2.5rem', sm: '3.5rem' },
                textAlign: 'center',
                mb: 2,
              }}
            >
              AI-Powered Recipe Generator
            </Typography>
          </Fade>
          <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9,
                textAlign: 'center',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              Transform your ingredients into delicious recipes with the power of artificial intelligence
            </Typography>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, sm: 8 } }}>
        <Fade in timeout={1000} style={{ transitionDelay: '400ms' }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              bgcolor: 'background.paper',
              boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <RecipeSuggestionForm />
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
