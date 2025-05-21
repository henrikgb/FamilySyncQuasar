<template>
  <q-layout>
    <q-toolbar class="bg-teal glossy text-white shadow-2">
      <div class="row justify-between items-center content-wrapper">
        <img
          src="~assets/WaterMark_HGB.png"
          alt="FamilySync Logo"
          width="50"
          height="50"
          class="q-my-sm"
        />

        <q-space />

        <q-btn-toggle
          v-model="model"
          flat
          stretch
          toggle-color="yellow"
          :options="[
            { value: PATHS.HOME, icon: 'home' },
            { value: PATHS.CALENDAR, icon: 'event' },
            { value: PATHS.SHOPPING_LIST, icon: 'shopping_cart' },
            { value: PATHS.TODO_LIST, icon: 'checklist' },
            { value: PATHS.SETTINGS, icon: 'settings' },
          ]"
          @update:model-value="handleToolbarRouteChange"
        />
      </div>
    </q-toolbar>
    <q-page-container class="bg-yellow-2">
      <div class="content-wrapper">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PATHS } from 'src/router/routes'

// Reactive model for the toolbar's active state
const model = ref(PATHS.HOME)

// Get the current route and router
const route = useRoute()
const router = useRouter()

// Watch for route changes and update the toolbar's active state
watch(
  () => route.path,
  (newPath) => {
    model.value = newPath // Synchronize the model with the current route
  },
  { immediate: true } // Ensure the model is updated on initial load
)

// Handle toolbar route changes
const handleToolbarRouteChange = async (newPath: string) => {
  if (newPath !== route.path) {
    await router.push(newPath) // Navigate to the selected route
  }
}
</script>

<style scoped>
.content-wrapper {
  width: 100%;
  max-width: 1280px;
  min-width: 350px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 8px;
}
</style>
