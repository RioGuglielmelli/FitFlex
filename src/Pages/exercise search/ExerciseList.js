import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { fetchExerciseDetails } from 'utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
const ExerciseList = ({ exerciseNames }) => {
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);
    const [setSelectedExerciseId] = useState(null); // Track the selected exercise ID
    const [options] = useState([]);
    const handleExerciseSelection = async (selectedExercise) => {
        try {
            const exerciseDetails = await fetchExerciseDetails(selectedExercise.id);
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