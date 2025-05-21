<template>
  <div class="text-center q-mb-lg">
    <p class="text-h2 q-mb-xs">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title: string;
}>();
</script>
