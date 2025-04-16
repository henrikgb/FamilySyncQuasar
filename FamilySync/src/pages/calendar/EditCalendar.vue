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

     <!-- Show a loading spinner while data is being fetched -->
     <div v-if="isLoading" class="text-center q-mt-lg">
      <q-spinner color="teal" size="50px" />
      <div class="w-full">
        <text-h4>Loading</text-h4>
      </div>
    </div>

    <!-- Display calendar items when data is loaded -->
    <div v-else class="q-mt-lg bg-yellow-3 rounded-borders q-pa-md">
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
import { useCalendarSchedule, useUpdateCalendarSchedule } from 'src/queries/useCalendarSchedule'
import type { CalendarScheduleItemDTO } from 'src/dto/CalendarScheduleDTO'
import { Notify } from 'quasar'

const { data: calendarSchedule, isLoading } = useCalendarSchedule()
const updateCalendarSchedule = useUpdateCalendarSchedule()

const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)
const description = ref('')

const sortedSchedules = computed(() => {
  return [...(calendarSchedule.value ?? [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

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
