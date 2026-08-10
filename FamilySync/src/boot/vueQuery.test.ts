import { describe, test, expect, vi } from 'vitest';
import type { QueryClient } from '@tanstack/vue-query';
import vueQueryBoot from './vueQuery';

describe('vueQuery boot', () => {
  test('configures the QueryClient with a non-zero staleTime and gcTime', () => {
    const use = vi.fn();
    void vueQueryBoot({ app: { use } } as never);

    expect(use).toHaveBeenCalledTimes(1);
    const [, { queryClient }] = use.mock.calls[0] as [unknown, { queryClient: QueryClient }];

    const defaults = queryClient.getDefaultOptions().queries;
    // A non-zero staleTime means a page revisited shortly after mount reuses
    // cached data instead of firing a fresh request (and MSAL token round trip)
    // on every navigation.
    expect(defaults?.staleTime).toBeGreaterThan(0);
    expect(defaults?.gcTime).toBeGreaterThan(0);
  });
});
