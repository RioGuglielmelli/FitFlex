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
