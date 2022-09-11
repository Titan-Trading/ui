const paths = {
    authed: {
        dashboard: '/dashboard',
        laboratory: {
            base: '/laboratory',
            bots: {
                base: '/laboratory/bots',
                create: '/laboratory/bots',
                view: '/laboratory/bots/:id',
                viewBuilder: (id: number) => `/laboratory/bots/${id}`,
                edit: '/laboratory/bots/:id/edit',
                editBuilder: (id: number) => `/laboratory/bots/${id}/edit`
            },
            botSessions: {
                base: '/laboratory/bot-sessions',
                create: '/laboratory/bot-sessions',
                view: '/laboratory/bot-sessions/:id',
                viewBuilder: (id: number) => `/laboratory/bot-sessions/${id}`,
                edit: '/laboratory/bot-sessions/:id/edit',
                editBuilder: (id: number) => `/laboratory/bot-sessions/${id}/edit`
            }
        },
        settings: {
            base: '/settings',
            apiKey: {
                create: '/settings/api-key',
                view: '/settings/api-key/:id',
                viewBuilder: (id: number) => `/settings/api-key/${id}`,
                edit: '/settings/api-key/:id/edit',
                editBuilder: (id: number) => `/settings/api-key/${id}/edit`
            },
            exchangeAccounts: {
                create: '/settings/exchange-accounts',
                view: '/settings/exchange-accounts/:id',
                viewBuilder: (id: number) => `/settings/exchange-accounts/${id}`,
                edit: '/settings/exchange-accounts/:id/edit',
                editBuilder: (id: number) => `/settings/exchange-accounts/${id}/edit`
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