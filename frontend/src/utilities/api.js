import axios from 'axios';


const config = {
    baseURL: import.meta.env.VITE_API_URL,
};

const API = axios.create(config);


export default API;
