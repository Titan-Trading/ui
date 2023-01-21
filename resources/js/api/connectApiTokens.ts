import Request from './requests';
import { API_URL } from '../helpers/constants';

export const getConnectToken = () => Request({
    method: 'POST',
    url: `${API_URL}/api-connect-tokens`
});