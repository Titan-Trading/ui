import Request from './requests';
import { IDataset } from '../models/Dataset';
import { API_URL } from '../helpers/constants';

export const getSupportTickets = () => Request({
    method: 'GET',
    url: `${API_URL}/support/tickets`
});