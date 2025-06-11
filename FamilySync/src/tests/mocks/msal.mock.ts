// tests/mocks/msal.mock.ts
import { vi } from 'vitest';

vi.mock('src/boot/msal', () => ({
  msalInstance: {
    loginPopup: vi.fn(),
    acquireTokenSilent: vi.fn(),
    logout: vi.fn(),
    getActiveAccount: vi.fn(() => null),
    getAllAccounts: vi.fn(() => []),
    setActiveAccount: vi.fn(),
  },
  default: vi.fn(),
}));
