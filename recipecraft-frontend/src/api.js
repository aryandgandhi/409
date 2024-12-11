import axios from 'axios';

const API_URL = 'https://four09-backend-ejlu.onrender.com'; // Updated to port 5002

export default axios.create({
  baseURL: API_URL,
});