<template>
  <q-layout view="lHh Lpr lFf">
    <div>
      <q-toolbar class="bg-secondary text-white shadow-2">
        FamilySync

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
const model = ref('home')

const onOptionChange = (value: string) => {
  router.push({ path: value }).catch((err) => {
    console.error('Failed to navigate:', err)
  })
}
</script>
