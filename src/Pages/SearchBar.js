import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { fetchExercise, fetchExercises, fetchCategoryDetails, fetchExerciseDetails, fetchCategoryNames, fetchMuscleNames } from '../utils/api';
import ExerciseDetails from './exercise search/ExerciseDetails';
import ExerciseList from './exercise search/ExerciseList';
// import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]); //my change
    const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null); //my change
    const [isDialogOpen, setIsDialogOpen] = useState(false); //my change
    //const [category, setCategory] = useState('');
    const [categoryNames, setCategoryNames] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredExercisesByCategory, setFilteredExercisesByCategory] = useState(null);
    const [muscleGroups, setMuscleGroup] = useState('');
    const [muscleNames, setMuscleNames] = useState([]);
    const [isExerciseDetailsDialogOpen, setIsExerciseDetailsDialogOpen] = useState(false);
    const [isExerciseListDialogOpen, setIsExerciseListDialogOpen] = useState(false);
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

        const fetchCategoryData = async () => {
            const categories = await fetchCategoryDetails();
            setCategoryNames(categories);
        };
        fetchCategoryData();
    }, []);

    useEffect(() => {
        if (searchTerm && Array.isArray(options)) {
            const filtered = options.filter((option) =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            //const sortedFiltered = filtered.sort((a, b) => {
             //   return a.name.toLowerCase().indexOf(searchTerm.toLowerCase()) - b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
            //});
            //setFilteredOptions(sortedFiltered);
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

    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close dialog box
    };

    useEffect(() => {
        const fetchAndDisplayCategoryNames = async () => {
            try {
                const fetchedCategoryNames = await fetchCategoryDetails();
                setCategoryNames(fetchedCategoryNames);
            } catch (error) {
                console.error('Error fetching category names:', error);
            }
        };
        fetchAndDisplayCategoryNames();
    }, []);

    // Call fetchExercise with the category ID when a category is selected
    // Usage example
    const handleCategorySelection = async (categoryName) => {
        const selectedCategory = categoryNames.find(category => category.name === categoryName);
        setSelectedCategory(selectedCategory);

        if (selectedCategory) {
            try {
                const exercises = await fetchCategoryNames(selectedCategory.id);
                setFilteredExercisesByCategory(exercises);
                setIsExerciseListDialogOpen(true);
            } catch (error) {
                console.error('Error fetching exercises by category:', error);
            }
        } else {
            console.log('Category not found');
        }
    };



    const fetchAndDisplayMuscleNames = async () => {
        try {
            const fetchedMuscleNames = await fetchMuscleNames();
            setMuscleNames(fetchedMuscleNames);
        } catch (error) {
            console.error('Error fetching and displaying muscle names:', error);
        }
    };

    useEffect(() => {
        fetchAndDisplayMuscleNames();
    }, []);
    const handleMuscleGroupSelection = (event, newValue) => {
        setMuscleGroup(newValue || '');
    };
    //my changes end

    return (
        //my changes start
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
                options={muscleNames.map(muscleGroup => ({ name: muscleGroup }))}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => handleMuscleGroupSelection(event, newValue?.name)}
                renderInput={(params) => <TextField {...params} label="Filter by Muscle Group" variant="outlined" />}
            />

            <Dialog open={isExerciseDetailsDialogOpen} onClose={() => setIsExerciseDetailsDialogOpen(false)}>
                <DialogTitle>Exercise Details</DialogTitle>
                <DialogContent>
                    {selectedExerciseDetails && <ExerciseDetails exercise={selectedExerciseDetails} />}
                    <Button onClick={() => setIsExerciseDetailsDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isExerciseListDialogOpen} onClose={() => setIsExerciseListDialogOpen(false)}>
                <DialogTitle>{selectedCategory ? `Exercises for ${selectedCategory.name}` : 'Exercises List'}</DialogTitle>
                <DialogContent>
                    {filteredExercisesByCategory && <ExerciseList exerciseNames={filteredExercisesByCategory} />}
                    <Button onClick={() => setIsExerciseListDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>
            {/*
            <Autocomplete
            freeSolo
            options={options.map((option) => option.name)}
            onInputChange={(event, newInputValue) => {
                setSearchTerm(newInputValue);
            }}
            onChange={(event, newValue) => {
                const selectedExercise = options.find((option) => option.name === newValue);
                if (selectedExercise) {
                    navigate(`/exercise/${selectedExercise.id}`);
                }
            }}
            renderInput={(params) => <TextField {...params} label="Search Exercises" variant="outlined" />}
        /> */}

        </>
    );
}

export default SearchBar;
