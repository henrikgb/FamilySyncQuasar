import { msalInstance } from 'src/boot/msal';

export async function getAccessToken(): Promise<string | null> {
  const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

  if (!account) {
    console.warn('No active account found');
    return null;
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      account,
      scopes: [`api://${import.meta.env.VITE_AZURE_CLIENT_ID}/access_as_user`]
    });

    console.log('Access token:', response.accessToken);
    return response.accessToken;
  } catch (error) {
    console.error('Failed to acquire access token silently', error);
    return null;
  }
}
