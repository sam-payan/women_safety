


import { AxiosInstance } from './AxiosInstance'

export const getHelp = async () => {
  try {
    const response = await AxiosInstance.get('/help')
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const createHelp = async (data) => {
  try {
    const response = await AxiosInstance.post('/help/create', data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
  }
};

export const updateHelp = async (id, status) => {
  try {
    if (!id || !status) {
      console.error("ID and status are required");
      return null;
    }

    console.log(`Updating help request ID: ${id} with status: ${status}`);

    const response = await AxiosInstance.put('/help/update', { id, status });
    
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating help request:", error.response?.data || error.message);
    return null;
  }
};