<template>
  <q-page class="column items-center q-pt-sm">
    <q-layout class="q-px-lg q-py-lg">
      <HeaderText :title="t('shoppingListPage.title')" />

      <div v-if="isAuthenticated" class="q-gutter-lg">
        <AddShoppingItem />
        <ViewAndManageShoppingList />
      </div>

      <div v-else>
        <DataProtectedGoToLogin />
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import AddShoppingItem from './AddShoppingItem.vue';
import ViewAndManageShoppingList from './ViewAndManageShoppingList.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/composables/useAuth';
import DataProtectedGoToLogin from 'src/components/pageLayoutBuildingBlocks/DataProtectedGoToLogin.vue';
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();

loadActiveAccount(); // Ensure login state is rehydrated if landing directly
</script>
