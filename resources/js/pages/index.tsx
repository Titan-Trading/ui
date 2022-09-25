const paths = {
    authed: {
        dashboard: '/dashboard',
        laboratory: {
            base: '/laboratory',
            bots: {
                create: '/laboratory/bots/create',
                view: '/laboratory/bots/:id',
                viewBuilder: (id: number) => `/laboratory/bots/${id}`,
                edit: '/laboratory/bots/:id/edit',
                editBuilder: (id: number) => `/laboratory/bots/${id}/edit`
            },
            botSessions: {
                create: '/laboratory/bot-sessions/create',
                view: '/laboratory/bot-sessions/:id',
                viewBuilder: (id: number) => `/laboratory/bot-sessions/${id}`,
                edit: '/laboratory/bot-sessions/:id/edit',
                editBuilder: (id: number) => `/laboratory/bot-sessions/${id}/edit`
            }
        },
        settings: {
            base: '/settings',
            apiKey: {
                create: '/settings/api-key/create',
            },
            exchangeAccounts: {
                create: '/settings/exchange-accounts/create',
            }
        }
    },
    guest: {
        login: '/login'
    },
    error: {
        error404: '/404'
    }
};

export default paths;