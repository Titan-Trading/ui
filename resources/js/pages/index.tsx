const paths = {
    authed: {
        dashboard: 'dashboard',
        laboratory: 'laboratory',
        settings: {
            all: 'settings',
            apiKey: {
                createApiKey: 'api-key',
                viewApiKey: 'api-key/:id',
                viewApiKeyBuilder: (id: number) => `api-key/${id}`,
                editApiKey: 'api-key/:id/edit',
                editApiKeyBuilder: (id: number) => `api-key/${id}/edit`
            }
        }
    },
    guest: {
        login: 'login'
    },
    error: {
        error404: '/404'
    }
};

export default paths;