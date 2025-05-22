<template>
  <div>
    <q-btn
      v-if="!isLoggedIn"
      :label="t('settingsPage.login')"
      color="teal"
      class="glossy"
      @click="login"
    />
    <div v-else>
      <p class="q-mb-none">{{ t('settingsPage.welcome') }}, {{ name }}</p>
      <q-btn
        :label="t('settingsPage.logout')"
        color="negative"
        class="q-mt-sm glossy"
        @click="logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { AccountInfo } from '@azure/msal-browser';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { appContext } = getCurrentInstance()!;
const msal = appContext.config.globalProperties.$msal;

const isLoggedIn = ref(false);
const name = ref('');
const router = useRouter();

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

const login = () => {
  // Dynamically set the post-login redirect to the current route
  sessionStorage.setItem('postLoginRedirect', router.currentRoute.value.fullPath);
  void msal.loginRedirect();
};

const logout = () => {
  void msal.logoutRedirect();
};
</script>
