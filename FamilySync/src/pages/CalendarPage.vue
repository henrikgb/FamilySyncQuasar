<template>
  <q-page class="column items-center">
    <q-layout>
      <div class="row justify-center item-center q-gutter-x-sm q-gutter-y-sm q-mb-sm q-mt-sm">
        <q-btn @click="setEditCalendarView" class="glossy" color="teal" icon="edit_calendar" label="Edit calendar" />
        <q-btn @click="setViewCalendarView" class="glossy" color="primary" icon-right="event_available" label="View calendar" />
      </div>

      <q-layout v-if="isEditCalendar" class="bg-green-3 q-px-lg q-py-lg row justify-center item-center">
          Edit calendar
      </q-layout>

      <q-layout v-if="isViewCalendar" class="bg-blue-3 q-px-lg q-py-lg row justify-center item-center">
          View calendar
      </q-layout>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isEditCalendar = ref(true)
const isViewCalendar = ref(false)

const setEditCalendarView = () => {
  isEditCalendar.value = true
  isViewCalendar.value = false
}
const setViewCalendarView = () => {
  isEditCalendar.value = false
  isViewCalendar.value = true
}
</script>
