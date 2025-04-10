<template>
  <q-layout class="q-px-lg q-py-lg row justify-center item-center">
    <div class="q-pa-md" style="max-width: 300px">
      <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date" color="teal">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const defaultDate = new Date().toISOString().split('T')?.[0]?.replace(/-/g, '/') ?? ''
const date = ref(defaultDate)
</script>
