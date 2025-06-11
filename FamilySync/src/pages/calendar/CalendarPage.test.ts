import 'src/tests/mocks/msal.mock.ts'
import { render } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import CalendarPage from 'src/pages/calendar/CalendarPage.vue'
import { i18n } from 'src/tests/setup/testI18n'

describe('CalendarPage', () => {
  test('displays correct header for Calendar page', () => {
    const utils = render(CalendarPage, {
      global: {
        plugins: [i18n],
      },
    })
    expect(utils.getByText('Calendar')).toBeInTheDocument()
  })
})
