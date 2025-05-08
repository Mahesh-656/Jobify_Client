import axios from "axios";
// import backendurl from './config'
const customFetch = axios.create({
    baseURL:  '/api/v1',  // Adding /api/v1 to the base URL
});

export default customFetch;
