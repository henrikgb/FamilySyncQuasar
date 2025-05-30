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
      <p class="q-mb-sm">{{ t('settingsPage.welcome') }}, {{ name }}</p>
      <p class="q-mb-md">{{ t('youHaveTheFollowingRoles') }}: {{  userRoles }}</p>
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
import { loginRequest } from 'src/boot/msal';
import { watch } from 'vue'
import { useAuth } from 'src/composables/useAuth'
import { computed } from 'vue';

const { activeAccount } = useAuth()
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
  void msal.loginRedirect(loginRequest);
};

const logout = () => {
  void msal.logoutRedirect();
};

watch(
  () => activeAccount.value?.idTokenClaims?.roles,
  (roles) => {
    if (roles) {
      console.log('🟢 Roles when available:', roles)
    } else {
      console.log('🔴 Roles not available yet')
    }
  },
  { immediate: true }
)
const userRoles = computed(() => activeAccount.value?.idTokenClaims?.roles ?? [])

</script>
