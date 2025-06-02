<template>
  <q-btn
    v-if="!isLoggedIn"
    :label="t('settingsPage.login')"
    color="teal"
    class="q-mt-sm glossy"
    @click="login"
  />
  <q-btn
    v-else-if="isLoggedIn"
    :label="t('settingsPage.logout')"
    color="negative"
    class="q-mt-sm glossy"
    @click="logout"
  />
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { AccountInfo } from '@azure/msal-browser';
import { useI18n } from 'vue-i18n';
import { loginRequest } from 'src/boot/msal';

const { t } = useI18n();
const { appContext } = getCurrentInstance()!;
const msal = appContext.config.globalProperties.$msal;
const isLoggedIn = ref(false);
const router = useRouter();

const login = () => {
  sessionStorage.setItem('postLoginRedirect', router.currentRoute.value.fullPath);
  void msal.loginRedirect(loginRequest);
};
const logout = () => {
  void msal.logoutRedirect();
};

onMounted(async () => {
  const result = await msal.handleRedirectPromise();
  if (result?.account) {
    msal.setActiveAccount(result.account);
  }

  const account: AccountInfo | undefined = msal.getAllAccounts()[0];
  if (account) {
    isLoggedIn.value = true;
  }
});

</script>
