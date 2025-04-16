<template>
  <q-page class="column items-center q-pt-xl q-px-md">

    <div class="text-center q-mb-lg">
      <p class="text-h6 q-mb-xs">{{ $t('homePage.welcomeMessage') }}</p>
      <p class="text-subtitle2">{{ $t('homePage.description') }}</p>
    </div>

    <div class="column q-gutter-md" style="width: 100%; max-width: 400px;">
      <q-btn
        outline
        class="q-pa-md"
        style="justify-start"
        @click="handleRouteChange(PATHS.CALENDAR)"
      >
        <template #default>
          <div class="row items-center no-wrap full-width">
            <q-icon name="event" />
            <div class="text-left ellipsis q-ml-sm">
              Schedule your appointments
            </div>
          </div>
        </template>
      </q-btn>

      <q-btn
        outline
        class="q-pa-md"
        style="justify-start"
        @click="handleRouteChange(PATHS.SHOPPING_LIST)"
      >
        <template #default>
          <div class="row items-center no-wrap full-width">
            <q-icon name="shopping_cart" />
            <div class="text-left ellipsis q-ml-sm">
              Plan your grocery shopping
            </div>
          </div>
        </template>
      </q-btn>

      <q-btn
        outline
        class="q-pa-md"
        style="justify-start"
        @click="handleRouteChange(PATHS.TODO_LIST)"
      >
        <template #default>
          <div class="row items-center no-wrap full-width">
            <q-icon name="checklist" />
            <div class="text-left ellipsis q-ml-sm">
              Plan your to-do-lists
            </div>
          </div>
        </template>
      </q-btn>

      <q-btn
        outline
        class="q-pa-md"
        style="justify-start"
        @click="handleRouteChange(PATHS.SETTINGS)"
      >
        <template #default>
          <div class="row items-center no-wrap full-width">
            <q-icon name="tune" />
            <div class="text-left ellipsis q-ml-sm">
              Adjust app settings
            </div>
          </div>
        </template>
      </q-btn>
    </div>

  </q-page>
</template>


<script setup lang="ts">
import { useHandleRouteChange, PATHS } from 'src/router/routes'
const { handleRouteChange } = useHandleRouteChange()
</script>
