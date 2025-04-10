<template>
  <q-layout class="q-px-lg q-py-lg">
    <div class="col item-center">
      <div class="row justify-center q-mb-lg">
        <q-date
          v-model="date"
          :events="events"
          event-color="orange"
          color="teal"
        />
      </div>
      <div class="row justify-center">
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
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { calendarSchedule } from 'src/assets/CalendarSchedule'

// Default date for the q-date component
const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)

// Extract unique dates for the q-date events
const events = ref(calendarSchedule.value.map(item => item.date))

// Watch for changes in calendarSchedule to update events dynamically
watch(calendarSchedule, (newSchedule) => {
  events.value = newSchedule.map(item => item.date)
})

// Group panel data by date
const groupedPanels = computed(() => {
  return calendarSchedule.value.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = []
    }
    acc[item.date]?.push(item.description)
    return acc
  }, {} as Record<string, string[]>)
})
</script>
