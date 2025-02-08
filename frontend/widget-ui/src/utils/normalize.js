export const normalizeWidgets = (data) => {
    //handle different data sturcture from the backend
    if (Array.isArray(data)) {
        return data;
    } else if (typeof data === 'object' && data !== null) {
        return [data];
    } else {
        console.error(`Unexpected data structure for `, data);
        return [];
    }
};