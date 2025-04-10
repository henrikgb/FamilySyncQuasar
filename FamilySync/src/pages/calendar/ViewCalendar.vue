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
            v-for="(texts, panelDate) in groupedPanels"
            :key="panelDate"
            :name="panelDate"
          >
            <div class="text-h4 q-mb-md">{{ panelDate }}</div>
            <div v-for="(text, index) in texts" :key="index">
              <p>{{ text }}</p>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const panelData = [
  {
    date: '2025/04/01',
    text: "TEST 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/01',
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/05',
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/06',
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  }
]

// Default date for the q-date component
const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)

// Extract unique dates for the q-date events
const events = panelData.map(item => item.date)

// Group panel data by date
const groupedPanels = computed(() => {
  return panelData.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = []
    }
    acc[item.date]?.push(item.text)
    return acc
  }, {} as Record<string, string[]>)
})
</script>
