import axios from 'axios';

const API_KEY = process.env.REACT_APP_WGER_API_KEY;

export const fetchExercises = async (page = 1) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
                page,
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { results: [], next: null };
    }
};

export const fetchExerciseDetails = async (id) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/${id}/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
};
export const fetchExerciseImages = async (exerciseId) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseimage/`, {
            params: {
                exercise: exerciseId,
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};