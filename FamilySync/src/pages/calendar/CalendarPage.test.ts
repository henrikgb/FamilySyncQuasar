import 'src/tests/mocks/msal.mock.ts'
import { createI18n } from 'vue-i18n'
import { render, prettyDOM } from '@testing-library/vue'
import { describe, test, expect, vi } from 'vitest'
import { ref } from 'vue'

import en from 'src/i18n/en-US/index'
import nb from 'src/i18n/nb-NO/index'
const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  messages: {
    'en-US': en,
    'nb-NO': nb,
  },
})

afterEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

describe('CalendarPage', () => {
  test('display correct text, when user IS NOT authenticated and IS NOT a calendar user', async () => {
    vi.doMock('src/composables/useAuth', () => ({
      useAuth: () => ({
        isAuthenticated: false,
        loadActiveAccount: vi.fn(),
        activeAccount: ref({
          idTokenClaims: {
            roles: [],
          }
        })
      })
    }))
    vi.doMock('src/utils/checkUserType', () => ({
      isCalendarUserType: false,
    }))

    const { useAuth } = await import('src/composables/useAuth')
    const { isCalendarUserType } = await import('src/utils/checkUserType')
    const { default: CalendarPage } = await import('src/pages/calendar/CalendarPage.vue')
    const utils = render(CalendarPage, {
      global: { plugins: [i18n] },
    })

    console.log('------------------------------------------------------------------------------------------------')
    console.log('TEST: display correct text, when user IS NOT authenticated and IS NOT a calendar user')
    console.log('isAuthenticated', useAuth().isAuthenticated)
    console.log('isCalendarUserType', isCalendarUserType)
    console.log('calendar page', prettyDOM(utils.container))
    expect(utils.getByText(en.calendarPage.title)).toBeInTheDocument()
    expect(utils.getByText(en.auth.dataIsProtected))
    expect(utils.getByText(en.auth.pleaseLogin)).toBeInTheDocument()
    console.log('------------------------------------------------------------------------------------------------')
  })

  test('display correct text, when user IS authenticated and IS NOT a calendar user', async () => {
    vi.doMock('src/composables/useAuth', () => ({
      useAuth: () => ({
        isAuthenticated: true,
        loadActiveAccount: vi.fn(),
        activeAccount: ref({
          idTokenClaims: {
            roles: [],
          }
        })
      })
    }))
    vi.doMock('src/utils/checkUserType', () => ({
      isCalendarUserType: false,
    }))


    const { useAuth } = await import('src/composables/useAuth')
    const { isCalendarUserType } = await import('src/utils/checkUserType')
    const { default: CalendarPage } = await import('src/pages/calendar/CalendarPage.vue')
    const utils = render(CalendarPage, {
      global: { plugins: [i18n] },
    })

    console.log('------------------------------------------------------------------------------------------------')
    console.log('TEST: display correct text, when user IS authenticated and IS NOT a calendar user')
    console.log('isAuthenticated', useAuth().isAuthenticated)
    console.log('isCalendarUserType', isCalendarUserType)
    console.log('calendar page', prettyDOM(utils.container))
    expect(utils.getByText(en.calendarPage.title)).toBeInTheDocument()
    expect(utils.getByText(en.userDoesNotHaveAccessToData)).toBeInTheDocument()
    console.log('------------------------------------------------------------------------------------------------')
  })

  test('display correct text, when user IS authenticated and IS a calendar user', async () => {
    vi.doMock('src/composables/useAuth', () => ({
      useAuth: () => ({
        isAuthenticated: true,
        loadActiveAccount: vi.fn(),
        activeAccount: ref({
          idTokenClaims: {
            roles: ['CalendarUser'],
          }
        })
      })
    }))
    vi.doMock('src/utils/checkUserType', () => ({
      isCalendarUserType: true,
    }))

    const { useAuth } = await import('src/composables/useAuth')
    const { isCalendarUserType } = await import('src/utils/checkUserType')
    const { default: CalendarPage } = await import('src/pages/calendar/CalendarPage.vue')
    const { VueQueryPlugin, QueryClient } = await import('@tanstack/vue-query')
    const queryClient = new QueryClient()

    const utils = render(CalendarPage, {
      global: {
        plugins: [i18n, [VueQueryPlugin, { queryClient }]],
      },
    })

    console.log('------------------------------------------------------------------------------------------------')
    console.log('TEST: display correct text, when user IS authenticated and IS a calendar user')
    console.log('isAuthenticated', useAuth().isAuthenticated)
    console.log('isCalendarUserType', isCalendarUserType)
    console.log('calendar page', prettyDOM(utils.container))
    expect(utils.getByText(en.calendarPage.title)).toBeInTheDocument()
    console.log('------------------------------------------------------------------------------------------------')
  })
})
