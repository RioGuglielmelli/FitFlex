import axios from 'axios';
import { getAccessToken, refreshToken } from './localStorage';

const API_KEY = process.env.REACT_APP_WGER_API_KEY;
const API_BASE_URL = 'https://wger.de/api/v2/';

// Axios instance for Wger API
const wgerApi = axios.create({
    baseURL: 'https://wger.de/api/v2/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add the Authorization header
wgerApi.interceptors.request.use(
    async (config) => {
        let token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// User registration
export const registerUser = async (email, password, firstName, lastName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, { email, password, firstName, lastName });
        return response.data;
    } catch (error) {
        console.error('There was a problem with the registration operation:', error);
        throw error;
    }
};

// User login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        localStorage.setItem('jwtToken', response.data.token);
        return response.data;
    } catch (error) {
        console.error('There was a problem with the login operation:', error);
        throw error;
    }
};



export const fetchExercise = async (searchTerm = '', limit = 50, categoryId) => {
    try {
        const exerciseResponse = await axios.get(`https://wger.de/api/v2/exercise/`, {
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
            params: {
                language: 2, // English language ID
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

export const fetchMuscleNames = async () => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/muscle/`, {
            params: {
                language: 2, // English language ID
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

export const fetchExercisesByCategory = async (categoryName, categoryId, limit = 50) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/`, {
            params: {
                language: 2, // English language ID
                category: categoryId,
                limit,
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
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export const fetchExercisesByMuscle = async (muscleId, categoryId, limit = 50) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/`, {
            params: {
                language: 2, // English language ID
                category: categoryId,
                limit,
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        });

        const filteredExercises = response.data.results.filter(exercise =>
            exercise.muscles.some(muscle => muscle.id === muscleId)
        );
        return filteredExercises;

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

export const fetchExerciseDetails = async (exerciseId, limit = 50, categoryId) => {
    try {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/${exerciseId}/`, {
            params: {
                format: 'json',
                language: 2,  // English language ID
                category: categoryId,
                limit,
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

// ******************************************WORKOUTPLAN MANAGEMENT API************************************************************************
export const getWorkout = async () =>{
    try {
        const response = await axios.get('https://wger.de/api/v2/workout',{
            params: {
                format: 'json',
                language: 2,  // English language ID
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        })
        const data = await response.data
        return data.results
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

export const createworkout = async (newWorkoutPlan) =>{
    try {
        const response = await axios.post('https://wger.de/api/v2/workout/',newWorkoutPlan,{

            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

export const editworkout = async (editedWorkoutPlan,id) =>{

    try {
        const response = await axios.put(`https://wger.de/api/v2/workout/${id}/`,editedWorkoutPlan,{

            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}
export const deleteworkout = async (id) =>{

    try {
        const response = await axios.delete(`https://wger.de/api/v2/workout/${id}/`,{

            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

export const getWorkoutById = async (id) =>{
    try {
        const response = await axios.get(`https://wger.de/api/v2/workout/${id}/`,{
            params: {
                format: 'json',
                language: 2,  // English language ID
            },
            headers: {
                'Authorization': `Token ${API_KEY}`,
            },
        })
        const data = await response.data
        return data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

// ******************************************WORKOUTPLAN MANAGEMENT API************************************************************************
