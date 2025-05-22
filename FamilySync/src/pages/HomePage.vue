<template>
  <PageLayout>
    <div class="home-grid-wrapper">
      <HeaderText :title="t('appTitle')" />
      <div class="row justify-center home-grid">
        <div
            v-for="(item, index) in homeItems"
            :key="index"
            class="col-5 q-ma-sm"
          >
            <q-card
                class="q-pa-sm q-mb-md cursor-pointer full-width bg-yellow-3 home-card"
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
                  {{ t(item.label) }}
                </div>
            </q-card>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { useHandleRouteChange, PATHS } from 'src/router/routes'
const { handleRouteChange } = useHandleRouteChange()
import CalendarCat from 'src/assets/CalendarCat.png'
import ShoppingCat from 'src/assets/ShoppingCat.png'
import TodoCat from 'src/assets/TodoCat.png'
import SettingsCat from 'src/assets/SettingsCat.png'
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';
import PageLayout from 'src/components/pageLayoutBuildingBlocks/PageLayout.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const homeItems = [
  { label: 'Calendar', img: CalendarCat, route: PATHS.CALENDAR },
  { label: 'ShoppingList', img: ShoppingCat, route: PATHS.SHOPPING_LIST },
  { label: 'TodoList', img: TodoCat, route: PATHS.TODO_LIST },
  { label: 'Settings', img: SettingsCat, route: PATHS.SETTINGS },
]
</script>

<style scoped>
.home-grid-wrapper {
  gap: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  min-width: 350px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 8px;
}
.home-grid {
  width: 100%;
}
.home-card {
  transition: transform 0.2s;
  width: 100%;
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home-card:hover {
  transform: scale(1.04);
}
</style>
