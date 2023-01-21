import Request from './requests';
// import { IProduct } from '../models/Product';
import { API_URL } from '../helpers/constants';

export const getProducts = () => Request({
    method: 'GET',
    url: `${API_URL}/marketplace/products`
});