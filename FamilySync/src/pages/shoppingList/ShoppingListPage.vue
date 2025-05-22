<template>
  <PageLayout>
    <HeaderText :title="t('shoppingListPage.title')" />
    <AddShoppingItem v-if="isAuthenticated" />
    <ViewAndManageShoppingList v-if="isAuthenticated"/>
    <DataProtectedGoToLogin v-else/>
  </PageLayout>
</template>

<script setup lang="ts">
import AddShoppingItem from './AddShoppingItem.vue';
import ViewAndManageShoppingList from './ViewAndManageShoppingList.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/composables/useAuth';
import DataProtectedGoToLogin from 'src/components/pageLayoutBuildingBlocks/DataProtectedGoToLogin.vue';
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';
import PageLayout from 'src/components/pageLayoutBuildingBlocks/PageLayout.vue';

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();

loadActiveAccount(); // Ensure login state is rehydrated if landing directly
</script>
