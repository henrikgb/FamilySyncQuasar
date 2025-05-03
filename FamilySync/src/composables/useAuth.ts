import { ref, computed } from 'vue';
import { msalInstance } from 'src/boot/msal';
import type { AccountInfo } from '@azure/msal-browser';

const activeAccount = ref<AccountInfo | null>(null);

const isAuthenticated = computed(() => !!activeAccount.value);

function loadActiveAccount() {
  const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0] || null;
  if (account) {
    msalInstance.setActiveAccount(account);
    activeAccount.value = account;
  }
}

export function useAuth() {
  return {
    isAuthenticated,
    activeAccount,
    loadActiveAccount,
  };
}
