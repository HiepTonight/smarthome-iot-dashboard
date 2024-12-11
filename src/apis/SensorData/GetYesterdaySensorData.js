import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const getYesterdaySensorData = async () => {
    try {
        const response = await axios.get(`${API_ROOT}/api/v1/sensor/data/yesterday`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export default getYesterdaySensorData;