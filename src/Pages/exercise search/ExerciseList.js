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

    if (!exerciseNames || exerciseNames.length === 0) {
        return <p>No exercises found for this muscle.</p>;
    }

    return (
        <div>
            <h3>Exercises:</h3>
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