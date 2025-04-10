<template>
  <q-layout class="q-px-lg q-py-lg">
    <div class="w-100 bg-yellow-3 rounded-borders q-pa-md">
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
      <q-input
        v-model="text"
        filled
        type="textarea"
        class="q-input-textarea"
      />
      <div class="row justify-end">
        <q-btn
          class="q-mt-md"
          label="Save"
          color="primary"
          @click="saveSchedule"
        />
      </div>
    </div>

    <div class="q-mt-lg bg-yellow-3 rounded-borders q-pa-md">
      <q-list>
        <q-expansion-item
          v-for="(schedules, key) in groupedSchedules"
          :key="key"
          :label="key"
          expand-separator
        >
          <q-item
            v-for="(schedule, index) in schedules"
            :key="index"
            class="schedule-item"
          >
            <q-item-section>
              <div>
                <strong>Date:</strong> {{ schedule.date }}<br />
                <strong>Text:</strong> {{ schedule.text }}
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                icon="delete"
                color="red"
                @click="deleteSchedule(index)"
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
import type { Schedule } from 'src/assets/CalendarSchedule'
import { Notify } from 'quasar'

const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)
const text = ref('')

const sortedSchedules = computed(() => {
  return [...calendarSchedule.value].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const groupedSchedules = computed(() => {
  const groups: Record<string, Schedule[]> = {}
  sortedSchedules.value.forEach(schedule => {
    const date = new Date(schedule.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(schedule)
  })
  return groups
})

const saveSchedule = () => {
  if (date.value && text.value) {
    calendarSchedule.value.push({ date: date.value, text: text.value })
    date.value = defaultDate
    text.value = ''
    Notify.create({
      message: 'Schedule saved successfully!',
      color: 'green',
      icon: 'check_circle',
      position: 'top'
    })
  } else {
    Notify.create({
      message: 'Please fill in both the date and text.',
      color: 'red',
      icon: 'error',
      position: 'top'
    })
  }
}

const deleteSchedule = (index: number) => {
  calendarSchedule.value.splice(index, 1)
  Notify.create({
    message: 'Schedule deleted successfully!',
    color: 'green',
    icon: 'delete',
    position: 'top'
  })
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

.schedule-item {
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 8px;
}
</style>
