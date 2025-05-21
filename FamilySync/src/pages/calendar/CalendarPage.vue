<template>
  <q-page class="column items-center q-pt-sm">
    <q-layout class="q-px-lg q-py-lg">
      <HeaderText :title="t('calendarPage.title')" />

      <div v-if="isAuthenticated">
        <ViewAndEditButtons
          @setViewCalendarView="val => isViewCalendar = val"
          @setEditCalendarView="val => isEditCalendar = val"
        />
        <EditCalendar v-if="isEditCalendar" />
        <ViewCalendar v-if="isViewCalendar" />
      </div>

      <div v-else>
        <DataProtectedGoToLogin />
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditCalendar from './EditCalendar.vue';
import ViewCalendar from './ViewCalendar.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/composables/useAuth';
import DataProtectedGoToLogin from 'src/components/pageLayoutBuildingBlocks/DataProtectedGoToLogin.vue';
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';
import ViewAndEditButtons from './ViewAndEditButtons.vue';

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();
const isViewCalendar = ref(true);
const isEditCalendar = ref(false);

loadActiveAccount(); // Ensure state is rehydrated if landing here directly
</script>
