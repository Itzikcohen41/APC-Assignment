import axios from 'axios';
const API_URL = 'http://127.0.0.1:5000/widget';
const checkUrlParams = (response) => {
    const urlParams = new URLSearchParams(window.location.search);
    const widgetId = urlParams.get('experience');
    if (widgetId) {
        return response.data.find(widget => widget.id === widgetId);
    }
    return null;
}

const abTesting = (widgets) => {
    const random = Math.random() * 100;
    let sumPercentage = 0;
    let widgetToDisplay = {};

    widgets.forEach(widget => {
        sumPercentage += widget.showToPercentage;
        if (random < sumPercentage) {
            widgetToDisplay = widget;
        }
    });
    return widgetToDisplay;
}

const normalizeWidgets = (data) => {
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

export const getWidgetByPage = async (page_name) => {
    try {
        const response = await axios.get(`${API_URL}/${page_name}`);

        const urlWidget = checkUrlParams(response);
        if (urlWidget)
            return urlWidget;
        const normalizedWidgets = normalizeWidgets(response.data);
        if (normalizedWidgets.length > 0)
            return abTesting(normalizedWidgets);
        return null;

    } catch (error) {
        console.error(`Error fetching widgets for page '${page_name}': ${error.message}`);
        return []; // Return empty array on error
    }
};
