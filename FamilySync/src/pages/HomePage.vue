<template>
  <q-layout class="q-px-lg q-py-lg">
    <q-page class="column items-center q-pt-sm q-px-md">
      <div class="text-center q-mb-lg">
        <p class="text-h2 q-mb-xs">FamilySync</p>
      </div>

      <div class="row q-col-gutter-md justify-center" style="max-width: 600px;">
        <div
          v-for="(item, index) in homeItems"
          :key="index"
          class="col-6"
        >
          <q-card
            class="q-pa-sm q-mb-md cursor-pointer full-width bg-yellow-3"
            flat
            bordered
            @click="handleRouteChange(item.route)"
          >
            <q-img
              :src="item.img"
              ratio="1"
              class="rounded-borders"
            />
            <div class="text-center text-subtitle2 q-mt-sm">
              {{ item.label }}
            </div>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>


<script setup lang="ts">
import { useHandleRouteChange, PATHS } from 'src/router/routes'
const { handleRouteChange } = useHandleRouteChange()
import CalendarCat from 'src/assets/CalendarCat.png'
import ShoppingCat from 'src/assets/ShoppingCat.png'
import TodoCat from 'src/assets/TodoCat.png'
import SettingsCat from 'src/assets/SettingsCat.png'

const homeItems = [
  {
    label: 'Calendar',
    img: CalendarCat,
    route: PATHS.CALENDAR,
  },
  {
    label: 'ShoppingList',
    img: ShoppingCat,
    route: PATHS.SHOPPING_LIST,
  },
  {
    label: 'TodoList',
    img: TodoCat,
    route: PATHS.TODO_LIST,
  },
  {
    label: 'Settings',
    img: SettingsCat,
    route: PATHS.SETTINGS,
  },
]
</script>
