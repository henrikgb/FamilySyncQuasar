import { describe, test, expect } from 'vitest';
import routes, { PATHS } from './routes';

describe('routes', () => {
  test('mounts MainLayout once as a shared parent for every page', () => {
    // Regression guard: previously each page path had its own top-level route
    // pointing at MainLayout.vue, so Vue Router treated navigation between pages
    // as a full layout remount instead of reusing one persistent app shell.
    const mainLayoutRoutes = routes.filter(
      (route) => route.path !== '/:catchAll(.*)*',
    );

    expect(mainLayoutRoutes).toHaveLength(1);

    const [mainRoute] = mainLayoutRoutes;
    const childPaths = mainRoute?.children?.map((child) => child.path) ?? [];

    expect(childPaths).toEqual(
      expect.arrayContaining([
        PATHS.HOME,
        PATHS.CALENDAR,
        PATHS.SHOPPING_LIST,
        PATHS.TODO_LIST,
        PATHS.SETTINGS,
      ]),
    );
  });

  test('keeps the catch-all route outside the shared layout', () => {
    const catchAll = routes.find((route) => route.path === '/:catchAll(.*)*');
    expect(catchAll).toBeDefined();
  });
});
