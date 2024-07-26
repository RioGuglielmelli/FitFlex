import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { fetchExerciseDetails } from 'utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
const ExerciseList = ({ exerciseNames, exercises }) => {
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);

    const handleExerciseSelection = async (exerciseId) => {
        try {
            const exerciseDetails = await fetchExerciseDetails(exerciseId);
            setSelectedExerciseDetails(exerciseDetails);
            setIsExerciseDetailsDialogOpen(true); // Open exercise details dialog
        } catch (error) {
            console.error('Error fetching exercise details:', error);
        }
    };

    return (
        <div>
            <h3>Exercises:</h3>
            {/*{exerciseNames.map((exercise, index) => (
                <li key={index}>
                    <Button onClick={() => handleExerciseSelection(index)}>
                        {exercise}
                    </Button>
                </li>
            ))}*/}
            {exercises.map((exercise) => (
                <li key={exercise.id}>
                    <Button onClick={() => handleExerciseSelection(exercise.id)}>
                        {exercise.name}
                    </Button>
                </li>
            ))}

            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                {selectedExerciseDetails && (
                    <>
                        <DialogTitle>Exercise Details</DialogTitle>
                        <DialogContent>
                            <ExerciseDetails exercise={selectedExerciseDetails} />
                            <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default ExerciseList;