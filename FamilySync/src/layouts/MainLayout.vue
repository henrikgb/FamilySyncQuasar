<template>
  <q-layout>
    <div>
      <q-toolbar class="bg-teal glossy text-white shadow-2">
        <img
          src="~assets/WaterMark_HGB.png"
          alt="FamilySync Logo"
          width="42"
          height="42"
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
      </q-toolbar>
    </div>
    <q-page-container class="bg-yellow-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHandleRouteChange, PATHS } from 'src/router/routes'

// Reactive model for the toolbar's active state
const model = ref(PATHS.HOME)

// Get the current route
const route = useRoute()

// Import the route change handler
const { handleRouteChange } = useHandleRouteChange()

// Watch for route changes and update the toolbar's active state
watch(
  () => route.path,
  (newPath) => {
    model.value = newPath
  }
)

// Handle toolbar route changes
const handleToolbarRouteChange = (newPath: string) => {
  handleRouteChange(newPath)
}

</script>
