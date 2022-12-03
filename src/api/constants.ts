import axios from 'axios';

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_READ_TOKEN}`,
  },
  baseURL: 'https://api.themoviedb.org/3',
});
