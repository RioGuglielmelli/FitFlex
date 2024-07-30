export const loadData = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load data", err);
        return undefined;
    }
};

export const saveData = (key, data) => {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error("Could not save data", err);
    }
};

export const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    return tokens ? tokens.access : null;
};

export const refreshToken = async (refreshToken) => {
    const response = await fetch('https://wger.de/api/v2/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });
    return response.json();
};
