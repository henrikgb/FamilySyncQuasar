<template>
  <div class="row justify-center item-center no-wrap">
    <q-btn
      @click="setViewCalendarView"
      class="glossy q-mx-sm"
      :color="isViewCalendar ? 'white' : 'teal'"
      :text-color="isViewCalendar ? 'teal' : 'white'"
      icon-right="event_available"
      :label="viewCalendarLabel"
    />
    <q-btn
      @click="setEditCalendarView"
      class="glossy q-mr-sm"
      :color="isEditCalendar ? 'white' : 'teal'"
      :text-color="isEditCalendar ? 'teal' : 'white'"
      icon="edit_calendar"
      :label="editCalendarLabel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{
  (e: 'setViewCalendarView', value: boolean): void;
  (e: 'setEditCalendarView', value: boolean): void;
}>();

const { t } = useI18n();

const viewCalendarLabel = t('calendarPage.viewCalendar');
const editCalendarLabel = t('calendarPage.editCalendar');

const isViewCalendar = ref(true);
const isEditCalendar = ref(false);

const setEditCalendarView = () => {
  isEditCalendar.value = true;
  isViewCalendar.value = false;
  emit('setEditCalendarView', isEditCalendar.value);
  emit('setViewCalendarView', isViewCalendar.value);
};
const setViewCalendarView = () => {
  isEditCalendar.value = false;
  isViewCalendar.value = true;
  emit('setEditCalendarView', isEditCalendar.value);
  emit('setViewCalendarView', isViewCalendar.value);
};
</script>
