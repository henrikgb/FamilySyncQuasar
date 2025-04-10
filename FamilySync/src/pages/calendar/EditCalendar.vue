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
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { calendarSchedule } from 'src/assets/CalendarSchedule'
import { Notify } from 'quasar'

const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)
const text = ref('')

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
</style>
