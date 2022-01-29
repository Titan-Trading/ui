import Request from './requests';

const API_URL = process.env.API_URL;

export const login = ({ email, password }) => Request({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: {
        email: email,
        password: password
    }
});