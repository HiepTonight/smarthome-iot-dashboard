import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const getAllDevices = async (homeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_ROOT}/api/v1/home/device`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        id: homeId,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

export default getAllDevices;