import Request from './requests';
import { IDataset } from '../models/Dataset';
import { API_URL } from '../helpers/constants';

export const getDatasets = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/datasets`
});