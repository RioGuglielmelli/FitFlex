import React, { useState } from 'react';
import { Button, Autocomplete, TextField, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { fetchExerciseDetails } from 'utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
const MuscleExerciseList = ({ exerciseNames }) => {
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null); // Track the selected exercise ID
    const [options, selectedOption] = useState([]);
    const handleExerciseSelection = async (selectedExercise) => {
        try {
            const exerciseDetails = await fetchExerciseDetails(selectedExercise.id);
            setSelectedExerciseDetails({
                ...selectedExerciseDetails,
                [selectedOption.id]: exerciseDetails,
            });
            setSelectedExerciseDetails(exerciseDetails);
            setIsExerciseDetailsDialogOpen(true); // Open exercise details dialog
        } catch (error) {
            console.error('Error fetching exercise details:', error);
        }
    };

    return (
        <div>
            <h3>Exercises:</h3>
            {exerciseNames.map((exercise, index) => (
                <li key={index}>
                    <Button onClick={() => handleExerciseSelection({ id: index, name: exercise })}>
                        {exercise}
                    </Button>
                </li>
            ))}
            {/*<h3>Exercises:</h3>
            {exerciseNames.map((exercise) => {
                const exerciseId = exercise.id; // Use existing ID or generate a unique ID
                return (
                    <li key={exerciseId}>
                        <Button onClick={() => handleExerciseSelection({ id: exerciseId, name: exercise.name })}>
                            {exercise.name}
                        </Button>
                    </li>
                );
            })}*/}
            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                {selectedExerciseId && (
                    <>
                        <DialogTitle>Exercise Details</DialogTitle>
                        <DialogContent>
                            <ExerciseDetails exercise={selectedExerciseDetails[selectedExerciseId]} />
                            <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default MuscleExerciseList;