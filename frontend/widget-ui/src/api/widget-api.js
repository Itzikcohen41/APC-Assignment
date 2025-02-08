import axios from "axios";

const API_URL = "http://127.0.0.1:5000/widget";

export const getWidgetsByPage = async (page_name) => {
  try {
    const response = await axios.get(`${API_URL}/${page_name}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching widgets in page ${page_name}, error message : ${error}`
    );
    throw error;
  }
};

export const getAllWidgets = async () => {
  try {
    const response = await axios.get(`${API_URL}s`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching all widgets, error message : ${error}`);
    throw error;
  }
};

export const addWidget = async (widget) => {
  try {
    const newWidget = { ...widget, id: crypto.randomUUID() };
    const response = await axios.post(`${API_URL}`, newWidget);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(`Error fetching all widgets, error message : ${error}`);
    throw error;
  }
};
export const deleteWidgetByID = async ({ page_name, widget_id }) => {
  try {
    const response = await axios.delete(`${API_URL}/${page_name}/${widget_id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting widget in page ${page_name}, error message : ${error}`
    );
    throw error;
  }
};
export const updateWidgetByID = async ({ page_name, widget_id, widget }) => {
  try {
    const response = await axios.put(
      `${API_URL}/${page_name}/${widget_id}`,
      widget
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating widget in page ${page_name}, error message : ${error}`
    );
    throw error;
  }
};
