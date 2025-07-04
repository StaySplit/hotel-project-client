import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
