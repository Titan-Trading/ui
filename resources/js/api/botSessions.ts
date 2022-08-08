import Request from './requests';

const API_URL = process.env.API_URL;
import { IFormData } from 'Routes/Authed/Laboratory/BotSessions/BotSession';

export const getBotSessions = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/bots/sessions`
});

export const createBotSessions = (data: IFormData) => Request({
    method: 'POST',
    url: `${API_URL}/trading/bots/sessions`,
    data: data
});