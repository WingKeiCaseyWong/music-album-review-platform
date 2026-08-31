import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://13.211.77.241:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;