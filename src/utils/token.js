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
