<template>
  <PageLayout>
    <HeaderText :title="t('todoListPage.title')" />

    <div v-if="isAuthenticated" class="q-gutter-lg">
      <AddTodoListItem />
      <ViewAndManageTodoList />
    </div>

    <div v-else>
      <DataProtectedGoToLogin />
    </div>
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

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();

loadActiveAccount(); // Ensure login state is rehydrated if landing directly
</script>
