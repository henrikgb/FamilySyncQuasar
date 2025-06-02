<template>
  <div v-if="isLoggedIn" class="q-mb-md ">
    <p class="text-h5 q-mb-xs">{{ t('settingsPage.welcome') }}, {{ name }}</p>
    <p class="q-mb-md">{{ t('youHaveTheFollowingRoles') }}:</p>
    <q-table
      class="q-mb- bg-amber-1"
      bordered
      :title="t('settingsPage.roles.title')"
      dense
      :rows="userRoleTableRows"
      :columns="userRoleTableColumns"
      row-key="name"
    />
  </div>
  <div v-else-if="!isLoggedIn">
    <p class="text-h5 q-mb-xs">{{ t('settingsPage.welcome') }}:</p>
    <p class="q-mb-md">{{ t('settingsPage.pleaseLogin') }}</p>
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
const userRoleTableColumns = computed(() => [
  {
    name: 'Role',
    required: true,
    label: t('settingsPage.roles.grantedRoles'),
    align: 'left' as const,
    field: 'roleType',
    sortable: true,
    classes: 'text-wrap',
    style: 'white-space: normal;',
  },
  {
    name: 'Role',
    required: true,
    label: t('settingsPage.roles.description'),
    align: 'left' as const,
    field: 'roleDescription',
    sortable: true,
    classes: 'text-wrap',
    style: 'white-space: normal;',
  },
]);

const userRoleTableRows = computed(() =>
  userRoles.value.map(role => ({
    roleType: role,
    roleDescription: t(`settingsPage.roles.${role}.description`) || role,
  }))
);

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
