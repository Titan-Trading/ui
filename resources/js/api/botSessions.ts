import Request from './requests';

import { IBotSession } from 'Routes/Authed/Laboratory/BotSessions';

export const getBotSessions = () => Request({
    method: 'GET',
    url: '/trading/bots/sessions'
});