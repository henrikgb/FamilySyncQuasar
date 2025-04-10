<template>
  <q-layout class="q-px-lg q-py-lg">
    <div class="w-100 bg-yellow-3 rounded-borders q-pa-md">
      <h6 class="q-my-sm">Enter date:</h6>
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
      <h6 class="q-my-sm">Enter description:</h6>
      <q-input
        v-model="description"
        filled
        type="textarea"
        class="q-input-textarea"
      />
      <div class="row justify-end">
        <q-btn
          class="q-mt-md"
          label="Save"
          color="primary"
          @click="saveScheduleItem"
        />
      </div>
    </div>

    <div class="q-mt-lg bg-yellow-3 rounded-borders q-pa-md">
      <h6 class="q-my-sm">Scheduled Events:</h6>
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
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { calendarSchedule } from 'src/assets/CalendarSchedule'
import type { ScheduleItem } from 'src/assets/CalendarSchedule'
import { Notify } from 'quasar'

const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)
const description = ref('')

const sortedSchedules = computed(() => {
  return [...calendarSchedule.value].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const groupedScheduleItems = computed(() => {
  const groups: Record<string, ScheduleItem[]> = {}
  sortedSchedules.value.forEach(scheduleItem => {
    const date = new Date(scheduleItem.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(scheduleItem)
  })
  return groups
})

const saveScheduleItem = () => {
  if (date.value && description.value) {
    calendarSchedule.value.push({ date: date.value, description: description.value })
    date.value = defaultDate
    description.value = ''
    Notify.create({
      message: 'Schedule item saved successfully!',
      color: 'green',
      icon: 'check_circle',
      position: 'top'
    })
  } else {
    Notify.create({
      message: 'Please fill in both the date and description.',
      color: 'red',
      icon: 'error',
      position: 'top'
    })
  }
}

const deleteScheduleItem = (scheduleItemToDelete: ScheduleItem) => {
  const index = calendarSchedule.value.findIndex(
    (scheduleItem) =>
    scheduleItem.date === scheduleItemToDelete.date &&
    scheduleItem.description === scheduleItemToDelete.description
  )
  if (index !== -1) {
    calendarSchedule.value.splice(index, 1)
    Notify.create({
      message: 'Schedule item deleted successfully!',
      color: 'green',
      icon: 'delete',
      position: 'top'
    })
  } else {
    Notify.create({
      message: 'Failed to delete schedule item.',
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
