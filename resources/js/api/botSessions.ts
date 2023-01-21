import Request from './requests';
import IBotSession from '../models/BotSession';
import { API_URL } from '../helpers/constants';

export const getBotSessions = (projectId: string) => Request({
    method: 'GET',
    url: `${API_URL}/trading/bots/${projectId}/sessions`
});

export const getBotSession = (projectId: string, sessionId: string) => Request({
    method: 'GET',
    url: `${API_URL}/trading/bots/${projectId}/sessions/${sessionId}`
});

export const createBotSession = (data: IBotSession) => Request({
    method: 'POST',
    url: `${API_URL}/trading/bots/${data.bot_id}/sessions`,
    data: data
});