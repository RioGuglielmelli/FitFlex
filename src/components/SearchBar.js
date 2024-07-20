import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { fetchExercises } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm) {
            const fetchData = async () => {
                const exercises = await fetchExercises(searchTerm);
                setOptions(exercises);
            };
            fetchData();
        }
    }, [searchTerm]);

    return (
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
        />
    );
}

export default SearchBar;
