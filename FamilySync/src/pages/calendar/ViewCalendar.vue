<template>
  <q-layout class="q-py-lg">
    <LoadingAnimation v-if="isLoadingCalendarSchedule || isLoadingPublicHolidays" />

    <div v-else class="col item-center">
      <div class="row justify-center q-mb-lg">
        <q-date
          v-model="date"
          :events="events"
          :event-color="getEventColor"
          color="teal"
        />
      </div>

      <ContentContainer v-if="hasVisibleDescriptions">
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          class="bg-yellow-3 rounded-borders"
        >
          <q-tab-panel
            v-for="(descriptions, panelDate) in groupedPanels"
            :key="panelDate"
            :name="panelDate"
          >
            <div class="text-h4 q-mb-md">{{ panelDate }}</div>
            <div v-for="(description, index) in descriptions" :key="index">
              <p>{{ description }}</p>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </ContentContainer>
      </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCalendarSchedule } from 'src/queries/useCalendarSchedule'
import type { CalendarScheduleItemDTO } from 'src/dto/CalendarScheduleDTO'
import LoadingAnimation from 'src/components/pageLayoutBuildingBlocks/LoadingAnimation.vue'
import ContentContainer from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue'
import { usePublicHolidays } from 'src/queries/usePublicHolidays'
import type { PublicHolidayDTO } from 'src/dto/PublicHolidayDTO'

/**
 * Fetch public holidays data from the Nager.Date – Public API.
 * - `publicHolidays`: Reactive data containing the public holidays.
 * - `isLoadingPublicHolidays`: Boolean indicating whether the data is still being fetched.
 */
const countryCode = 'NO' // Norway
const { data: publicHolidays, isLoading: isLoadingPublicHolidays } = usePublicHolidays(countryCode, new Date().getFullYear())


/**
 * Fetch calendar schedule data from the API.
 * - `calendarSchedule`: Reactive data containing the schedule items.
 * - `isLoading`: Boolean indicating whether the data is still being fetched.
 */
const { data: calendarSchedule, isLoading: isLoadingCalendarSchedule } = useCalendarSchedule()


/**
 * Default date for the `q-date` component.
 * - Uses the current date in the format `YYYY/MM/DD`.
 */
const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)


/**
 * Combine calendar schedule items with public holidays.
 */
const mergedSchedule = computed<CalendarScheduleItemDTO[]>(() => {
  const calendarItems = calendarSchedule.value ?? []

  const holidayItems = (publicHolidays.value ?? []).map((holiday: PublicHolidayDTO) => ({
    date: holiday.date.replace(/-/g, '/'), // Convert date to the format YYYY/MM/DD
    description: holiday.localName,
  }))

  return [...calendarItems, ...holidayItems]
})


/**
 * Extract unique dates from the calendar schedule for the `q-date` events.
 * - Returns an array of dates (`string[]`) to highlight on the calendar.
 */
const events = computed(() => {
  if (!mergedSchedule.value) return []
  return mergedSchedule.value.map((item: CalendarScheduleItemDTO) => item.date)
})


/**
 * Extract public holiday dates for use in the calendar.
 * - Returns an array of dates (`string[]`) to highlight on the calendar.
 */
const holidayDates = computed(() =>
  (publicHolidays.value ?? []).map((item: CalendarScheduleItemDTO) => item.date.replace(/-/g, '/')) // Convert date to the format YYYY/MM/DD
)
const getEventColor = (dateStr: string): string => {
  return holidayDates.value.includes(dateStr) ? 'blue' : 'orange'
}


/**
 * Group calendar schedule items by date.
 * - Returns an object where:
 *   - Keys are unique dates (`string`).
 *   - Values are arrays of descriptions (`string[]`) for that date.
 * - Example:
 *   Input: [{ date: '2025-04-15', description: 'Meeting' }, { date: '2025-04-15', description: 'Lunch' }]
 *   Output: { '2025-04-15': ['Meeting', 'Lunch'] }
 */
const groupedPanels = computed(() => {
  if (!mergedSchedule.value) return {}
  return mergedSchedule.value.reduce((acc: Record<string, string[]>, item: CalendarScheduleItemDTO) => {
    // Initialize the array for the date if it doesn't exist
    if (!acc[item.date]) {
      acc[item.date] = []
    }
    // Add the description to the corresponding date
    acc[item.date]?.push(item.description)
    return acc
  }, {} as Record<string, string[]>)
})


const hasVisibleDescriptions = computed(() => {
  return (groupedPanels.value[date.value] ?? []).length > 0
})
</script>
