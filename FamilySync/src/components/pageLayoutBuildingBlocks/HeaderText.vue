<template>
  <div class="text-center">
    <p class="text-h2 q-mb-none">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title: string;
}>();
</script>
