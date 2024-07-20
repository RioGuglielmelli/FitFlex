import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => (
    <Box className="landing-page-container">
        <Container maxWidth="md" className="hero-section">
            <Typography variant="h2" className="hero-title" gutterBottom>
                Welcome to FitFlex
            </Typography>
            <Typography variant="h5" className="hero-subtitle" paragraph>
                Your ultimate fitness companion. Track your progress, manage workouts, and stay motivated.
            </Typography>
            <Button variant="contained" color="primary" size="large" component={Link} to="/signin" className="hero-button">
                Get Started
            </Button>
        </Container>
    </Box>
);

export default LandingPage;
