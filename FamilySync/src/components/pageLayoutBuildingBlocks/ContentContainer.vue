<template>
  <q-card :class="['q-pa-md', 'rounded-borders', backgroundClass]">
    <slot />
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  definedBackgroundColor?: string;
}>();

const backgroundClass = computed(() => props.definedBackgroundColor ?? 'bg-yellow-3');
</script>
