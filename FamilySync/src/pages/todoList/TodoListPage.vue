<template>
  <PageLayout>
    <HeaderText :title="t('todoListPage.title')" />
    <AddTodoListItem v-if="isAuthenticated && isTodoUserType"/>
    <ViewAndManageTodoList v-if="isAuthenticated && isTodoUserType" />
    <UserDoesNotHaveAccessToData v-if="isAuthenticated && !isTodoUserType" />
    <DataProtectedGoToLogin v-else />
  </PageLayout>
</template>

<script setup lang="ts">
import AddTodoListItem from './AddTodoListItem.vue';
import ViewAndManageTodoList from './ViewAndManageTodoList.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/composables/useAuth';
import DataProtectedGoToLogin from 'src/components/pageLayoutBuildingBlocks/DataProtectedGoToLogin.vue';
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';
import PageLayout from 'src/components/pageLayoutBuildingBlocks/PageLayout.vue';
import { isTodoUserType } from 'src/utils/checkUserType';
import UserDoesNotHaveAccessToData from 'src/components/pageLayoutBuildingBlocks/UserDoesNotHaveAccessToData.vue';

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();

loadActiveAccount(); // Ensure login state is rehydrated if landing directly
</script>
