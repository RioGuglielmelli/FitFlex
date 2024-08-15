import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { fetchExercise, fetchCategoryNames, fetchExercisesByCategory, fetchExerciseDetails, fetchMuscleNames, fetchExercisesByMuscle } from '../utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
import ExerciseList from 'Pages/exercise search/ExerciseList';
import MuscleExerciseList from 'Pages/exercise search/MuscleExerciseList';

function SearchBar({setSelectedExercise,selectedExercise}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
    const [categoryNames, setCategoryNames] = useState([]);
    const [selectedCategory] = useState(null);
    const [filteredExercisesByCategory, setFilteredExercisesByCategory] = useState(null);
    const [muscleNames, setMuscleNames] = useState([]);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [filteredExercisesByMuscle, setFilteredExercisesByMuscle] = useState(null);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);
    const [isExerciseCategoryListDialogOpen, setIsExerciseCategoryListDialogOpen] = useState(false);
    const [isExerciseMuscleListDialogOpen, setIsExerciseMuscleListDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const exercises = await fetchExercise('');
            setOptions(exercises);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = options.filter((option) =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions([]);
        }
    }, [searchTerm, options]);

    const handleInputChange = (event, newInputValue) => {
        setSearchTerm(newInputValue);
    };

    const handleExerciseSelection = async (event, selectedOption) => {
        const selectedExercise = options.find((option) => option.name === selectedOption);
        if (selectedExercise) {
            try {
                const exerciseDetails = await fetchExerciseDetails(selectedExercise.id);
                setSelectedExerciseDetails(exerciseDetails);
                setIsExerciseDetailsDialogOpen(true); // Open exercise details dialog
            } catch (error) {
                console.error('Error fetching exercise details:', error);
            }
        }
    };

    useEffect(() => {
        const fetchAndDisplayCategoryNames = async () => {
            try {
                const fetchedCategoryNames = await fetchCategoryNames();
                setCategoryNames(fetchedCategoryNames);
            } catch (error) {
                console.error('Error fetching category names:', error);
            }
        };
        fetchAndDisplayCategoryNames();
    }, []);

    // Call fetchExerciseByCategory with the category ID when a category is selected
    const handleCategorySelection = async (categoryName) => {
        try {
            const exercises = await fetchExercisesByCategory(categoryName);
            // Update state with exercise names and open the exercise list dialog
            setFilteredExercisesByCategory(exercises);
            setIsExerciseCategoryListDialogOpen(true);
        } catch (error) {
            console.error('Error fetching exercises by category:', error);
        }
    };

    useEffect(() => {
        const fetchAndDisplayMuscleNames = async () => {
            try {
                const fetchedMuscleNames = await fetchMuscleNames();
                setMuscleNames(fetchedMuscleNames.map(muscle => ({ id: muscle.id, name: muscle.name })));
            } catch (error) {
                console.error('Error fetching and displaying muscle names:', error);
            }
        };
        fetchAndDisplayMuscleNames();
    }, []);

    // Call fetchExerciseByMuscle with the muscle ID when a muscle is selected
    const handleMuscleSelection = async (event, newValue) => {
        setSelectedMuscle(newValue);
        try {
            const exercises = await fetchExercisesByMuscle(newValue.id);
            setFilteredExercisesByMuscle(exercises);
            setIsExerciseMuscleListDialogOpen(true);
        } catch (error) {
            console.error('Error fetching exercises by muscle:', error);
        }
    };

    return (
        <>
            <Autocomplete
                freeSolo
                options={filteredOptions.map((option) => option.name)}
                onInputChange={handleInputChange}
                onChange={handleExerciseSelection}
                renderInput={(params) => <TextField {...params} label="Search Exercises" variant="outlined" />}
            />

            <Autocomplete
                options={categoryNames.map(category => category.name)}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => handleCategorySelection(newValue)}
                renderInput={(params) => <TextField {...params} label="Filter by Category" variant="outlined" />}
            />
            <Autocomplete
                options={muscleNames}
                getOptionLabel={(option) => option.name}
                onChange={handleMuscleSelection}
                renderInput={(params) => <TextField {...params} label="Filter by Muscle Group" variant="outlined" />}
            />

            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                <DialogTitle>Exercise Details</DialogTitle>
                <DialogContent>
                    {selectedExerciseDetails && <ExerciseDetails exercise={selectedExerciseDetails} setSelectedExercise={setSelectedExercise}  pageFrom="exercises" selectedExercise={selectedExercise} />}
                    <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isExerciseCategoryListDialogOpen} onClose={() => setIsExerciseCategoryListDialogOpen(false)}>
                <DialogTitle>{selectedCategory ? `Exercises for ${selectedCategory.name}` : 'Exercises List'}</DialogTitle>
                <DialogContent>
                    {filteredExercisesByCategory && (
                        <ExerciseList exerciseNames={filteredExercisesByCategory.map(exercise => exercise.name)} exercises={filteredExercisesByCategory} setSelectedExercise={setSelectedExercise}  selectedExercise={selectedExercise}/>)}
                    <Button onClick={() => setIsExerciseCategoryListDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isExerciseMuscleListDialogOpen} onClose={() => setIsExerciseMuscleListDialogOpen(false)}>
                <DialogTitle>{selectedMuscle ? `Exercises for ${selectedMuscle.name}` : 'Exercises List'}</DialogTitle>
                <DialogContent>
                    {filteredExercisesByMuscle && (
                        <MuscleExerciseList exerciseNames={filteredExercisesByMuscle} setSelectedExercise={setSelectedExercise}   selectedExercise={selectedExercise}/>)}
                    <Button onClick={() => setIsExerciseMuscleListDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default SearchBar;
