// src/utils/customFetch.js
import axios from "axios";

const customFetch = axios.create({
    baseURL: import.meta.env.VITE_BACKEND + '/api/v1',
    withCredentials: true,
});

export default customFetch;
