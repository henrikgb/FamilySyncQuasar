// src/tests/setup/testI18n.ts
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  messages: {
    'en-US': {
      calendarPage: {
        title: 'Calendar',
        viewCalendar: 'View',
        editCalendar: 'Edit',
        enterDate: 'Enter Date',
        enterDescription: 'Enter Description',
        scheduledEvents: 'Scheduled Events',
        save: 'Save',
      },
    },
    'nb-NO': {
      calendarPage: {
        title: 'Kalender',
        viewCalendar: 'Vis',
        editCalendar: 'Rediger',
        enterDate: 'Skriv inn dato',
        enterDescription: 'Skriv inn beskrivelse',
        scheduledEvents: 'Planlagte hendelser',
        save: 'Lagre',
      },
    },
  },
})
