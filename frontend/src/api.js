import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api'
});

export const getCommunities = () => API.get('/communities');
export const getProducts = (community) => API.get('/products', { params: { community } });
export const getProduct = (id) => API.get(`/products/${id}`);
export const getCategories = (community) => API.get(`/categories/${community}`);

export default API;
