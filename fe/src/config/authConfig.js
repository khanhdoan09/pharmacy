// microsoft authentication below
export const msalConfig = {
    auth: {
        clientId: 'a0009c06-17e5-438c-8fa8-a076d28644ce',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'https://localhost:3000',
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ['api://a0009c06-17e5-438c-8fa8-a076d28644ce/client'],
};
