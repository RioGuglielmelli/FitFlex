import React from 'react';
import { Box, Typography,Button } from '@mui/material';
import '../../styles/Exercises.css';

function ExerciseDetails({ exercise,pageFrom,setSelectedExercise,selectedExercise }) {
    const addExercises = (exercise) => {
        setSelectedExercise((prevState) => {
            return [...prevState,exercise]
        })
    }

    const isExerciseAdded = () => {
        if(pageFrom === 'exercises'){

            return !!selectedExercise.find((item)=>item.uuid === exercise.uuid)
        }
    }
    return (
        <Box p={3} sx={{position:"relative"}}>
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
            {
           
            pageFrom === 'exercises' &&  (
                <Box sx={{position:"absolute",bottom:0,right:10}}>
                    {
                        isExerciseAdded() ? (<Button onClick={()=>alert("This Exercise is already added")}>ADDED</Button>) : (<Button onClick={()=>addExercises(exercise)}>ADD</Button>)
                    }
                    
                </Box>
            )
            }
        </Box>
    );
}

export default ExerciseDetails;
