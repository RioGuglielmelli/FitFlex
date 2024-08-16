import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { fetchExerciseDetails } from 'utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
const MuscleExerciseList = ({ exerciseNames ,setSelectedExercise,selectedExercise,pageFrom}) => {
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
            {exerciseNames.map((exercise) => (
                <li key={exercise.id} >
                <Button onClick={() => handleExerciseSelection(exercise.id)}>
                    {exercise.name}
                </Button>
                </li>
            ))}
            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                    <>
                        <DialogTitle>Exercise Details</DialogTitle>
                        <DialogContent>
                            {setSelectedExerciseDetails && <ExerciseDetails exercise={selectedExerciseDetails} setSelectedExercise={setSelectedExercise}  pageFrom={pageFrom} selectedExercise={selectedExercise}/>}
                            <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                        </DialogContent>
                    </>
            </Dialog>
        </div>
    );
};

export default MuscleExerciseList;