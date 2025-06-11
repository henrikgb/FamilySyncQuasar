import 'src/tests/mocks/msal.mock.ts'
import { createI18n } from 'vue-i18n'
import { render, prettyDOM } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import CalendarPage from 'src/pages/calendar/CalendarPage.vue'

// Import actual translations
import en from 'src/i18n/en-US/index'
import nb from 'src/i18n/nb-NO/index'

// Create an i18n instance with real messages
const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  messages: {
    'en-US': en,
    'nb-NO': nb,
  },
})

describe('CalendarPage', () => {
  test('displays correct header for Calendar page', () => {
    const utils = render(CalendarPage, {
      global: {
        plugins: [i18n],
      },
    })
    expect(utils.getByText(en.calendarPage.title)).toBeInTheDocument()
    console.log('calendar page', prettyDOM(utils.container))
  })
})
