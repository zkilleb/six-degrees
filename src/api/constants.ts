import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_SERVER_ADDRESS;

export const api = axios.create({
  baseURL: BASE_URL,
});
