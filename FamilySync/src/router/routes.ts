import type { RouteRecordRaw } from 'vue-router';

export const PATHS = {
  HOME: '/',
  CALENDAR: '/calendar',
  SHOPPING_LIST: '/shopping-list',
  TODO_LIST: '/to-do-list',
  SETTINGS: '/settings',
}

const routes: RouteRecordRaw[] = [
  {
    path: PATHS.HOME,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: PATHS.CALENDAR,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CalendarPage.vue') }],
  },
  {
    path: PATHS.SHOPPING_LIST,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ShoppingListPage.vue') }],
  },
  {
    path: PATHS.TODO_LIST,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TodoListPage.vue') }],
  },
  {
    path: PATHS.SETTINGS,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SettingsPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
