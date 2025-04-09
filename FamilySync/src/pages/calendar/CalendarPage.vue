<template>
  <q-page class="column items-center">
    <q-layout>
      <div class="row justify-center item-center q-gutter-x-sm q-gutter-y-sm q-mb-sm q-mt-sm">
        <q-btn @click="setEditCalendarView" class="glossy" color="teal" icon="edit_calendar" label="Edit calendar" />
        <q-btn @click="setViewCalendarView" class="glossy" color="primary" icon-right="event_available" label="View calendar" />
      </div>

      <EditCalendar v-if="isEditCalendar" />

      <ViewCalendar v-if="isViewCalendar" />

    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditCalendar from './EditCalendar.vue';
import ViewCalendar from './ViewCalendar.vue';

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
