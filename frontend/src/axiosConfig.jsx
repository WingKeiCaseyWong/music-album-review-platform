import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://3.106.117.55:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;