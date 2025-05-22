<template>
  <q-layout class="column" style="gap: 16px">
    <ContentContainer>
      <h6 class="q-my-sm">{{ t('calendarPage.enterDate') }}:</h6>

      <q-input
        filled
        v-model="date"
        mask="date"
        :rules="['date']"
        class="q-input-date"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date" color="teal">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <h6 class="q-mb-sm q-mt-none">{{ t('calendarPage.enterDescription') }}:</h6>
      <q-input
        v-model="description"
        filled
        type="textarea"
        class="q-input-textarea"
      />

      <q-btn
        class="glossy q-mt-md"
        label="Save"
        color="teal"
        @click="saveScheduleItem"
      />
    </ContentContainer>

    <LoadingAnimation v-if="isLoading" />

    <ContentContainer v-else>
      <h6 class="q-my-sm">{{ t('calendarPage.scheduledEvents') }}:</h6>
      <q-list>
        <q-expansion-item
          v-for="(scheduleItems, key) in groupedScheduleItems"
          :key="key"
          :label="key"
          class="black-border bg-lime-3"
        >
          <q-item
            v-for="(scheduleItem, index) in scheduleItems"
            :key="index"
            class="black-border bg-lime-2"
          >
            <q-item-section>
              <div>
                <strong>Date:</strong> {{ scheduleItem.date }}<br />
                <strong>Description:</strong> {{ scheduleItem.description }}
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                icon="delete"
                color="red"
                @click="deleteScheduleItem(scheduleItem)"
              />
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </ContentContainer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCalendarSchedule, useUpdateCalendarSchedule } from 'src/queries/useCalendarSchedule'
import type { CalendarScheduleItemDTO } from 'src/dto/CalendarScheduleDTO'
import LoadingAnimation from 'src/components/pageLayoutBuildingBlocks/LoadingAnimation.vue'
import ContentContainer from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

// Fetch schedule data and loading state using TanStack Query
const { data: calendarSchedule, isLoading } = useCalendarSchedule()

// Mutation function to send the full list of schedule items to the backend
const updateCalendarSchedule = useUpdateCalendarSchedule()

// Reactive date field, initialized to today's date in YYYY/MM/DD format
const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)

// Reactive description field
const description = ref('')

// Sort schedule items chronologically by date
const sortedSchedules = computed(() => {
  return [...(calendarSchedule.value ?? [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})

// Group schedule items by month (YYYY-MM)
const groupedScheduleItems = computed(() => {
  const groups: Record<string, CalendarScheduleItemDTO[]> = {}
  sortedSchedules.value.forEach(scheduleItem => {
    const d = new Date(scheduleItem.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!groups[key]) groups[key] = []
    groups[key].push(scheduleItem)
  })
  return groups
})

/**
 * Save a new schedule item
 * - Appends the new item to the existing list
 * - Sends the full updated list to the backend via POST
 */
const saveScheduleItem = async () => {
  if (!calendarSchedule.value) return

  if (date.value && description.value) {
    const newList: CalendarScheduleItemDTO[] = [
      ...calendarSchedule.value,
      {
        date: date.value,
        description: description.value
      }
    ]

    try {
      await updateCalendarSchedule.mutateAsync(newList)
      date.value = defaultDate
      description.value = ''
      Notify.create({
        message: 'Schedule item saved successfully!',
        color: 'green',
        icon: 'check_circle',
        position: 'top'
      })
    } catch {
      Notify.create({
        message: 'Failed to save item.',
        color: 'red',
        icon: 'error',
        position: 'top'
      })
    }
  } else {
    Notify.create({
      message: 'Please fill in both the date and description.',
      color: 'red',
      icon: 'error',
      position: 'top'
    })
  }
}

/**
 * Delete a schedule item
 * - Filters the selected item out of the current list
 * - Sends the full updated list to the backend via POST
 */
const deleteScheduleItem = async (scheduleItem: CalendarScheduleItemDTO) => {
  if (!calendarSchedule.value) return

  const newList = calendarSchedule.value.filter(
    (item: CalendarScheduleItemDTO) =>
      item.date !== scheduleItem.date || item.description !== scheduleItem.description
  )

  try {
    await updateCalendarSchedule.mutateAsync(newList)
    Notify.create({
      message: 'Schedule item deleted successfully!',
      color: 'green',
      icon: 'delete',
      position: 'top'
    })
  } catch {
    Notify.create({
      message: 'Failed to delete item.',
      color: 'red',
      icon: 'error',
      position: 'top'
    })
  }
}
</script>

<style scoped>
.q-input-date {
  max-width: 200px;
  width: 100%;
}

.q-input-textarea {
  flex: 1;
  width: 100%;
}

.black-border {
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 8px;
}
</style>
