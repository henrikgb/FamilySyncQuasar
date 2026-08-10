import { msalInstance } from 'src/boot/msal';

// Cached in-memory so repeated queries on the same page (or across pages within
// the token's lifetime) don't each pay for a round trip through MSAL's own cache.
let cachedToken: string | null = null;
let cachedTokenExpiresOn = 0;

// Refresh a bit before the real expiry so we never hand out a token that expires mid-request.
const EXPIRY_BUFFER_MS = 60_000;

export async function getAccessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedTokenExpiresOn - EXPIRY_BUFFER_MS) {
    return cachedToken;
  }

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

    cachedToken = response.accessToken;
    cachedTokenExpiresOn = response.expiresOn?.getTime() ?? Date.now() + EXPIRY_BUFFER_MS;

    return cachedToken;
  } catch (error) {
    console.error('Failed to acquire access token silently', error);
    return null;
  }
}

// Call on logout / account switch so a token for the previous account is never reused.
export function clearCachedAccessToken(): void {
  cachedToken = null;
  cachedTokenExpiresOn = 0;
}
