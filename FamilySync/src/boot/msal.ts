// src/boot/msal.ts
import { boot } from 'quasar/wrappers';
import { PublicClientApplication } from '@azure/msal-browser';
import type { Configuration } from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.DEV
      ? import.meta.env.VITE_AZURE_REDIRECT_URI_DEV
      : import.meta.env.VITE_AZURE_REDIRECT_URI_PROD,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export default boot(async ({ app }) => {
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();

  if (response?.account) {
    msalInstance.setActiveAccount(response.account);
  }

  const targetUrl = sessionStorage.getItem('postLoginRedirect');
  if (targetUrl) {
    sessionStorage.removeItem('postLoginRedirect');
    window.location.href = targetUrl; // Redirect after login
  }

  app.config.globalProperties.$msal = msalInstance;
});

