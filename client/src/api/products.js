import api from './axios';

export const getProducts = async (params = {}) => (await api.get('/products', { params })).data;

export const getProduct = async (slug) => (await api.get(`/products/${slug}`)).data.product;