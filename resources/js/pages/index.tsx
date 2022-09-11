const paths = {
    authed: {
        dashboard: '/dashboard',
        laboratory: '/laboratory',
        settings: {
            all: '/settings',
            apiKey: {
                createApiKey: '/settings/api-key',
                editApiKey: '/settings/api-key/:id',
                editApiKeyBuilder: (id: number) => `/settings/api-key/${id}`
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