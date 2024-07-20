import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import theme from './theme/theme';
import LandingPage from './components/LandingPage';
import SignInSignUpPage from './components/SignInSignUpPage';
import Dashboard from './components/Dashboard';
import Exercises from './components/Exercises';
import ExerciseDetails from './components/ExerciseDetails';
import NotFoundPage from './components/NotFoundPage';
import Footer from './components/Footer';
import './App.css'; // Ensure you have this or adjust according to your file structure

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                  FitFlex
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/signin">Sign In</Button>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/exercises">Exercises</Button>
              </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInSignUpPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercises/:id" element={<ExerciseDetails />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
  );
}

export default App;
