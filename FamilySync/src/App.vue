<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from 'src/composables/useAuth';

const { loadActiveAccount } = useAuth();

onMounted(() => {
  loadActiveAccount();
});
</script>
