<template>
  <q-page class="column items-center q-pt-sm">
    <q-layout class="q-px-lg q-py-lg">
      <div class="text-center q-mb-xl">
        <p class="text-h2 q-mb-xs">{{ t('shoppingListPage.title') }}</p>
      </div>

      <div v-if="isAuthenticated" class="q-gutter-lg">
        <AddShoppingItem />
        <ViewAndManageShoppingList />
      </div>

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
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import AddShoppingItem from './AddShoppingItem.vue';
import ViewAndManageShoppingList from './ViewAndManageShoppingList.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from 'src/composables/useAuth';

const { t } = useI18n();
const { isAuthenticated, loadActiveAccount } = useAuth();

loadActiveAccount(); // Ensure login state is rehydrated if landing directly
</script>
