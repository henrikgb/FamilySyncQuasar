<template>
  <q-page class="column items-center q-pt-sm">
    <q-layout class="q-px-lg q-py-lg">
      <div class="text-center q-mb-lg">
        <p class="text-h2 q-mb-xs">{{ t('calendarPage.title') }}</p>
      </div>

      <!--<div v-if="isAuthenticated">  TEMPORARY -->
        <div class="row justify-center item-center q-gutter-x-sm q-gutter-y-sm q-mb-sm no-wrap">
          <q-btn
            @click="setViewCalendarView"
            class="glossy"
            :color="isViewCalendar ? 'white' : 'teal'"
            :text-color="isViewCalendar ? 'teal' : 'white'"
            icon-right="event_available"
            :label="viewCalendarLabel"
          />
          <q-btn
            @click="setEditCalendarView"
            class="glossy"
            :color="isEditCalendar ? 'white' : 'teal'"
            :text-color="isEditCalendar ? 'teal' : 'white'"
            icon="edit_calendar"
            :label="editCalendarLabel"
          />
        </div>

        <EditCalendar v-if="isEditCalendar" />
        <ViewCalendar v-if="isViewCalendar" />
      <!--</div> TEMPORARY -->

      <!-- TEMPORARY commented out to give someone a chance to view the calendar
      <div v-else class="text-center text-grey q-mt-xl">
        <p>{{ t('auth.pleaseLogin') }}</p>
        <q-btn
          label="Go to Settings"
          color="primary"
          flat
          to="/settings"
          class="q-mt-md"
        />
      </div>
      -->
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditCalendar from './EditCalendar.vue';
import ViewCalendar from './ViewCalendar.vue';
import { useI18n } from 'vue-i18n';
//import { useAuth } from 'src/composables/useAuth';

const { t } = useI18n();
//const { isAuthenticated, loadActiveAccount } = useAuth();

//loadActiveAccount(); // Ensure state is rehydrated if landing here directly

const viewCalendarLabel = t('calendarPage.viewCalendar');
const editCalendarLabel = t('calendarPage.editCalendar');

const isViewCalendar = ref(true);
const isEditCalendar = ref(false);

const setEditCalendarView = () => {
  isEditCalendar.value = true;
  isViewCalendar.value = false;
};
const setViewCalendarView = () => {
  isEditCalendar.value = false;
  isViewCalendar.value = true;
};
</script>
