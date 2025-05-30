<template>
  <PageLayout>
    <HeaderText :title="t('calendarPage.title')" />

    <div v-if="isAuthenticated" class="column" style="gap: 16px">
      <ViewAndEditButtons v-if="isCalendarUser"
        @setViewCalendarView="val => isViewCalendar = val"
        @setEditCalendarView="val => isEditCalendar = val"
      />
      <EditCalendar v-if="isEditCalendar && isCalendarUser" />
      <ViewCalendar v-if="isViewCalendar && isCalendarUser" />
      <UserDoesNotHaveAccessToData  v-if="isAuthenticated && !isCalendarUser" />
    </div>

    <DataProtectedGoToLogin v-if="!isAuthenticated" />
  </PageLayout>
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
import PageLayout from 'src/components/pageLayoutBuildingBlocks/PageLayout.vue';
import UserDoesNotHaveAccessToData from 'src/components/pageLayoutBuildingBlocks/UserDoesNotHaveAccessToData.vue';
import { isCalendarUserType } from 'src/utils/checkUserType';

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();
const isViewCalendar = ref(true);
const isEditCalendar = ref(false);
const isCalendarUser = isCalendarUserType;

loadActiveAccount(); // Ensure state is rehydrated if landing here directly
</script>
