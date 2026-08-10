/* eslint-disable @typescript-eslint/unbound-method -- msalInstance is a plain mock object of vi.fn()s, not a class instance with `this` binding */
import 'src/tests/mocks/msal.mock';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { msalInstance } from 'src/boot/msal';
import { getAccessToken, clearCachedAccessToken } from './getAccessToken';

describe('getAccessToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCachedAccessToken();
  });

  test('returns null and skips MSAL when there is no account', async () => {
    vi.mocked(msalInstance.getActiveAccount).mockReturnValue(null);
    vi.mocked(msalInstance.getAllAccounts).mockReturnValue([]);

    const token = await getAccessToken();

    expect(token).toBeNull();
    expect(msalInstance.acquireTokenSilent).not.toHaveBeenCalled();
  });

  test('reuses a cached token instead of calling MSAL again while it is still valid', async () => {
    vi.mocked(msalInstance.getActiveAccount).mockReturnValue({} as never);
    vi.mocked(msalInstance.acquireTokenSilent).mockResolvedValue({
      accessToken: 'token-1',
      expiresOn: new Date(Date.now() + 10 * 60_000),
    } as never);

    const first = await getAccessToken();
    const second = await getAccessToken();

    expect(first).toBe('token-1');
    expect(second).toBe('token-1');
    expect(msalInstance.acquireTokenSilent).toHaveBeenCalledTimes(1);
  });

  test('re-acquires once the cached token is expired', async () => {
    vi.mocked(msalInstance.getActiveAccount).mockReturnValue({} as never);
    vi.mocked(msalInstance.acquireTokenSilent)
      .mockResolvedValueOnce({
        accessToken: 'token-1',
        expiresOn: new Date(Date.now() - 1),
      } as never)
      .mockResolvedValueOnce({
        accessToken: 'token-2',
        expiresOn: new Date(Date.now() + 10 * 60_000),
      } as never);

    const first = await getAccessToken();
    const second = await getAccessToken();

    expect(first).toBe('token-1');
    expect(second).toBe('token-2');
    expect(msalInstance.acquireTokenSilent).toHaveBeenCalledTimes(2);
  });

  test('clearCachedAccessToken forces a fresh acquisition on the next call', async () => {
    vi.mocked(msalInstance.getActiveAccount).mockReturnValue({} as never);
    vi.mocked(msalInstance.acquireTokenSilent).mockResolvedValue({
      accessToken: 'token-1',
      expiresOn: new Date(Date.now() + 10 * 60_000),
    } as never);

    await getAccessToken();
    clearCachedAccessToken();
    await getAccessToken();

    expect(msalInstance.acquireTokenSilent).toHaveBeenCalledTimes(2);
  });
});
