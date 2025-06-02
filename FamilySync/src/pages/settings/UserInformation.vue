<template>
  <div v-if="isLoggedIn">
    <p class="text-h5 q-mb-xs">{{ t('settingsPage.welcome') }}, {{ name }}</p>
    <p class="q-mb-md">{{ t('youHaveTheFollowingRoles') }}: {{  userRoles }}</p>
  </div>
  <div v-else-if="!isLoggedIn">
    <p class="text-h5 q-mb-xs">{{ t('settingsPage.welcome') }}:</p>
    <p class="q-mb-md">{{ t('settingsPage.pleaseLogin') }}!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useAuth } from 'src/composables/useAuth';
import type { AccountInfo } from '@azure/msal-browser';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { activeAccount } = useAuth();
const { appContext } = getCurrentInstance()!;
const msal = appContext.config.globalProperties.$msal;
const name = ref('');
const userRoles = computed(() => activeAccount.value?.idTokenClaims?.roles ?? [])
const isLoggedIn = ref(false);

onMounted(async () => {
  const result = await msal.handleRedirectPromise();
  if (result?.account) {
    msal.setActiveAccount(result.account);
  }

  const account: AccountInfo | undefined = msal.getAllAccounts()[0];
  if (account) {
    isLoggedIn.value = true;
    name.value = account.name || account.username;
  }
});
</script>
