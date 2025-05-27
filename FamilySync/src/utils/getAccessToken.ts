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

    console.log('response.scopes', response.scopes);
    console.log('Access token:', response.accessToken);
    const payloadPart = response.accessToken.split('.')[1];
    if (!payloadPart) {
      throw new Error('Invalid access token format');
    }
    const tokenPayload = JSON.parse(atob(payloadPart));
    console.log('Decoded token payload:', tokenPayload);

    return response.accessToken;
  } catch (error) {
    console.error('Failed to acquire access token silently', error);
    return null;
  }
}
