<template>
  <div class="q-mb-lg">
    <q-btn
      v-if="!isLoggedIn"
      label="Login with Microsoft"
      color="primary"
      @click="login"
    />
    <div v-else class="column items-center">
      <div class="text-subtitle2 q-mt-sm">Welcome, {{ username }}</div>
      <q-btn
        label="Logout"
        color="negative"
        class="q-mt-sm"
        @click="logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { AccountInfo } from '@azure/msal-browser';

const { appContext } = getCurrentInstance()!;
const msal = appContext.config.globalProperties.$msal;

const isLoggedIn = ref(false);
const username = ref('');
const router = useRouter();

onMounted(async () => {
  const result = await msal.handleRedirectPromise();
  if (result?.account) {
    msal.setActiveAccount(result.account);
  }

  const account: AccountInfo | undefined = msal.getAllAccounts()[0];
  if (account) {
    isLoggedIn.value = true;
    username.value = account.username;
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
