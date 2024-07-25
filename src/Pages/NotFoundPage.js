import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <Container maxWidth="sm">
            <Box textAlign="center" my={5}>
                <Typography variant="h4" gutterBottom>
                    404 - Page Not Found
                </Typography>
                <Typography variant="subtitle1">
                    The page you are looking for doesn't exist.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 3 }}>
                    Go Home
                </Button>
            </Box>
        </Container>
    );
}

export default NotFoundPage;
