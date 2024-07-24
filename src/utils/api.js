import axios from 'axios';

const API_KEY = process.env.REACT_APP_WGER_API_KEY;

//my code starts
export const fetchExercise = async (searchTerm = '', language = '2', page = 1) => {
    try {
        const exerciseResponse = await axios.get(`https://wger.de/api/v2/exercise/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
                page,
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });

        let filteredExercises = exerciseResponse.data.results;

        if (searchTerm) {
            filteredExercises = filteredExercises.filter((exercise) =>
                exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredExercises.sort((a, b) => a.name.localeCompare(b.name));

        return filteredExercises;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

export const fetchCategoryNames = async (categoryId) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/`, {
            params: {
                category: categoryId,
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });

        // Extract category names from the response
        const categoryNames = response.data.results.map(category => category.name);

        return categoryNames;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export const fetchMuscleNames = async () => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/muscle/`, {
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });

        // Extract muscle names from the response
        const muscleNames = response.data.results.map(muscle => muscle.name);

        return muscleNames;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

// Fetch category IDs and names
export const fetchCategoryDetails = async (categoryId) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exercisecategory/`, {
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
//my code ends
export const fetchExercises = async (categoryId, page = 1, limit =10) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
                page,
                category: categoryId,
                limit,
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });
        // Filter exercises to include only those with language ID 2
        /* const filteredExercises = response.data.results.filter(exercise =>
            exercise.language === 2 &&
            exercise.id !== 2145 &&
            exercise.id !== 2157
        );

        return {
            ...response.data,
            results: filteredExercises
        }; */
        if (!response.data.results || response.data.results.length === 0) {
            // No more results, stop loading
            return { results: [], next: null };
        }

        if (!response.data.next) {
            return { results: [], next: null };
        }

        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { results: [], next: null };
    }
};

export const fetchExerciseDetails = async (id) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/${id}/`, {
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
