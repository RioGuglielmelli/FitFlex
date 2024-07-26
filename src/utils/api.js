import axios from 'axios';

const API_KEY = process.env.REACT_APP_WGER_API_KEY;


export const fetchExercise = async (searchTerm = '') => {
    try {
        const exerciseResponse = await axios.get(`https://wger.de/api/v2/exercise/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
                //page,
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

export const fetchMuscleNames = async (muscleId) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/muscle/`, {
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

export const fetchExercisesByCategory = async (categoryName) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/`, {
            params: {
                language: 2, // English language ID
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });

        // Filter exercises by category name
        const filteredExercises = response.data.results.filter(exercise =>
            exercise.category.name === categoryName
        );
        return filteredExercises;
        //const exerciseNames = filteredExercises.map(exercise => exercise.name);
        //return exerciseNames;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export const fetchExercisesByMuscle = async (muscleName) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/`, {
            params: {
                language: 2, // English language ID
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });

        // Filter exercises by muscle name
        const filteredExercises = response.data.results.filter(exercise =>
            exercise.muscles.some(muscle => muscle.name === muscleName));
        return filteredExercises;
        //const exerciseNames = filteredExercises.map(exercise => exercise.name);
        //return exerciseNames;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export const fetchExercises = async (categoryId, limit =50) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
                //page,
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
        );*/

        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { results: [], next: null };
    }
};

export const fetchExerciseDetails = async (exerciseId) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/${exerciseId}/`, {
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

