import React, { useState } from 'react';
import { Button, Autocomplete, TextField, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { fetchExerciseDetails } from 'utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
const MuscleExerciseList = ({ exerciseNames }) => {
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null); // Track the selected exercise ID
    const [options, selectedOption] = useState([]);
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
            {/*<h3>Exercises:</h3>
            {exerciseNames.map((exercise, index) => (
                <li key={index}>
                    <Button onClick={() => handleExerciseSelection(exercise.id)}>
                        {exercise.name}
                    </Button>
                </li>
            ))}*/}
            <h3>Exercises:</h3>
            {exerciseNames.map((exercise) => {
                return (
                    <li key={exercise.id}>
                        <Button onClick={() => handleExerciseSelection(exercise.id )}>
                            {exercise.name}
                        </Button>
                    </li>
                );
            })}
            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                    <>
                        <DialogTitle>Exercise Details</DialogTitle>
                        <DialogContent>
                            {selectedExerciseId && <ExerciseDetails exercise={selectedExerciseDetails} />}
                            <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                        </DialogContent>
                    </>
            </Dialog>
        </div>
    );
};

export default MuscleExerciseList;