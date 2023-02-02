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

export const updateBotSession = (data: IBotSession) => Request({
    method: 'PUT',
    url: `${API_URL}/trading/bots/${data.bot_id}/sessions/${data.id}`,
    data: data
});

export const deleteBotSession = (data: IBotSession) => Request({
    method: 'DELETE',
    url: `${API_URL}/trading/bots/${data.bot_id}/sessions/${data.id}`
});

export const stopBotSession = (data: IBotSession, pausedAt: any) => Request({
    method: 'POST',
    url: `${API_URL}/trading/bots/${data.bot_id}/sessions/${data.id}/stop`,
    data: {
        paused_at: pausedAt
    }
});

export const resumeBotSession = (data: IBotSession) => Request({
    method: 'POST',
    url: `${API_URL}/trading/bots/${data.bot_id}/sessions/${data.id}/resume`
});