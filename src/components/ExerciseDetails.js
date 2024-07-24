import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './ExerciseDetails.css';
import { Link } from 'react-router-dom';

function ExerciseDetails({ exercise }) {
    return (
        <Box p={3}>
            <Typography id="exercise-details-title" variant="h4" component="h2">
                {exercise.name}
            </Typography>
            <Typography id="exercise-details-description" sx={{ mt: 2 }}>
                {exercise.description.replace(/(<([^>]+)>)/gi, "")}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Muscle Groups</Typography>
            <Typography>
                {exercise.muscles.map((muscle) => muscle.name).join(', ')}
            </Typography>
            {exercise.images && exercise.images.length > 0 ? (
                exercise.images.map((image) => (
                    <img key={image.id} src={image.image} alt={exercise.name} style={{ maxWidth: '100%', marginTop: '10px' }} />
                ))
            ) : (
                <Typography>No images available</Typography>
            )}
            <Button variant="contained" color="primary" size="large" component={Link} to="/signin" className="hero-button">
                Add to workout plan
            </Button>
        </Box>
    );
}

export default ExerciseDetails;
