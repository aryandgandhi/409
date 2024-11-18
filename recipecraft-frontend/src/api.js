import axios from 'axios';

const API_URL = 'http://localhost:5002'; // Updated to port 5002

export default axios.create({
  baseURL: API_URL,
});