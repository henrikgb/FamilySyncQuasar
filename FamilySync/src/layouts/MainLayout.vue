<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md">
      <q-toolbar class="bg-secondary text-white q-my-md shadow-2">
        FamilySync

        <q-space />

        <q-btn-toggle
          v-model="model"
          flat
          stretch
          toggle-color="yellow"
          :options="options"
          @update:model-value="onOptionChange"
        />
      </q-toolbar>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PATHS } from 'src/router/routes'

const router = useRouter()
const model = ref('home') // Default to 'home'

interface OptionType {
  value: string
  icon: string
}

const options: OptionType[] = [
  { value: PATHS.HOME, icon: 'home' },
  { value: PATHS.CALENDAR, icon: 'event' },
  { value: PATHS.SHOPPING_LIST, icon: 'shopping_cart' },
  { value: PATHS.TODO_LIST, icon: 'checklist' },
  { value: PATHS.SETTINGS, icon: 'settings' },
] as const

// Function to handle route changes
const onOptionChange = (value: string) => {
  router.push({ path: value }).catch((err) => {
    console.error('Failed to navigate:', err)
  })
}
</script>
