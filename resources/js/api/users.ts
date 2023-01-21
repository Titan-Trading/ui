import Request from './requests';
import { ILoginFormData } from 'Routes/Guest/Login';
import { IForgotPasswordFormData } from 'Routes/Guest/ForgotPassword';
import { API_URL } from '../helpers/constants';
import { IRegisterFormData } from 'Routes/Guest/Signup';

// register a new user
export const signup = (data: IRegisterFormData) => Request({
    method: 'POST',
    url: `${API_URL}/auth/register`,
    data: data
});

// login a user
export const login = (data: ILoginFormData) => Request({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: data
});

// send a password reset link to the user's email
export const forgotPassword = (data: IForgotPasswordFormData) => Request({
    method: 'POST',
    url: `${API_URL}/auth/forgot-password`,
    data: data
});

// get a user by id
export const getUser = (id: number) => Request({
    method: 'GET',
    url: `${API_URL}/users/${id}`
});

// get current users total account balance
export const getBalance = () => Request({
    method: 'GET',
    url: `${API_URL}/balance`
});

// get current users total account balance
export const getBalanceBreakdown = () => Request({
    method: 'GET',
    url: `${API_URL}/metrics/balance-breakdown`
});

// get current total sales
export const getTotalSales = () => Request({
    method: 'GET',
    url: `${API_URL}/metrics/total-sales`
});

// get current users percent completion for the boot camp
export const getBootCampCompletion = () => Request({
    method: 'GET',
    url: `${API_URL}/metrics/bootcamp-completion`
});

// get current users percent completion for the boot camp
export const getMetrics = (name: string) => Request({
    method: 'GET',
    url: `${API_URL}/metrics/${name}`
});