import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { fetchExercise, fetchCategoryNames, fetchExercisesByCategory, fetchExerciseDetails, fetchMuscleNames, fetchExercisesByMuscle } from '../utils/api';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';
import ExerciseList from 'Pages/exercise search/ExerciseList';
import MuscleExerciseList from 'components/MuscleExerciseList';
// import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);
    const [categoryNames, setCategoryNames] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredExercisesByCategory, setFilteredExercisesByCategory] = useState(null);
    const [muscleNames, setMuscleNames] = useState([]);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [filteredExercisesByMuscle, setFilteredExercisesByMuscle] = useState(null);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);
    const [isExerciseCategoryListDialogOpen, setIsExerciseCategoryListDialogOpen] = useState(false);
    const [isExerciseMuscleListDialogOpen, setIsExerciseMuscleListDialogOpen] = useState(false);
    //const navigate = useNavigate();

    /*useEffect(() => {
        if (searchTerm) {
            const fetchData = async () => {
                const exercises = await fetchExercises(searchTerm);
                setOptions(exercises);
            };
            fetchData();
        }
    }, [searchTerm]); */

    //my changes start
    /*useEffect(() => {
        const fetchData = async () => {
            try {
                const exercises = await fetchExercise('');
                setOptions(Array.isArray(exercises) ? exercises : []);
            } catch (error) {
                console.error('Error fetching exercises:', error);
                setOptions([]);
            }
        };
        fetchData();
    }, []); */
    useEffect(() => {
        const fetchData = async () => {
            const exercises = await fetchExercise('');
            setOptions(Array.isArray(exercises) ? exercises : []);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm && Array.isArray(options)) {
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
            const exerciseNames = await fetchExercisesByCategory(categoryName);
            // Update state with exercise names and open the exercise list dialog
            setFilteredExercisesByCategory(exerciseNames);
            setIsExerciseCategoryListDialogOpen(true);
        } catch (error) {
            console.error('Error fetching exercises by category:', error);
        }
    };

    useEffect(() => {
        const fetchAndDisplayMuscleNames = async () => {
            try {
                const fetchedMuscleNames = await fetchMuscleNames();
                if (Array.isArray(fetchedMuscleNames)) {
                    setMuscleNames(fetchedMuscleNames);
                } else {
                    console.error('Invalid muscle names data:', fetchedMuscleNames);
                }
            } catch (error) {
                console.error('Error fetching and displaying muscle names:', error);
            }
        };
        fetchAndDisplayMuscleNames();
    }, []);

    // Call fetchExerciseByMuscle with the muscle ID when a muscle is selected
    const handleMuscleSelection = async (muscleName) => {
        try {
            setSelectedMuscle(muscleName); // Set the selected muscle name

            const exerciseNames = await fetchExercisesByMuscle(muscleName);
            if (Array.isArray(exerciseNames)) {
                // Update state with fetched exercise names and open the exercise list dialog
                setFilteredExercisesByMuscle(exerciseNames);
                setIsExerciseMuscleListDialogOpen(true);
            } else {
                // Handle the case where the exerciseNames data is not an array
                console.error('Invalid exercise names data:', exerciseNames);
            }
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
                onChange={(event, newValue) => handleMuscleSelection(newValue)}
                renderInput={(params) => <TextField {...params} label="Filter by Muscle Group" variant="outlined" />}
            />

            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                <DialogTitle>Exercise Details</DialogTitle>
                <DialogContent>
                    {selectedExerciseDetails && <ExerciseDetails exercise={selectedExerciseDetails} />}
                    <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isExerciseCategoryListDialogOpen} onClose={() => setIsExerciseCategoryListDialogOpen(false)}>
                <DialogTitle>{selectedCategory ? `Exercises for ${selectedCategory.name}` : 'Exercises List'}</DialogTitle>
                <DialogContent>
                    {filteredExercisesByCategory && <ExerciseList exerciseNames={filteredExercisesByCategory} />}
                    <Button onClick={() => setIsExerciseCategoryListDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isExerciseMuscleListDialogOpen} onClose={() => setIsExerciseMuscleListDialogOpen(false)}>
                <DialogTitle>{selectedMuscle ? `Exercises for ${selectedMuscle.name}` : 'Exercises List'}</DialogTitle>
                <DialogContent>
                    {filteredExercisesByMuscle && <MuscleExerciseList exerciseNames={filteredExercisesByMuscle} />}
                    <Button onClick={() => setIsExerciseMuscleListDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default SearchBar;
