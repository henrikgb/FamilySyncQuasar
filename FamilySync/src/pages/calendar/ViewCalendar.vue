<template>
  <q-layout class="q-px-lg q-py-lg">
    <div class="col item-center">
      <div class="row justify-center q-mb-lg">
        <q-date
          v-model="date"
          :events="events"
          event-color="orange"
          color="teal"
        />
      </div>
      <div class="row justify-center">
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          class="bg-yellow-3 rounded-borders"
        >
          <q-tab-panel name="2019/02/01">
            <div class="text-h4 q-mb-md">2019/02/01</div>
            <p>TEST 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="2019/02/01">
            <div class="text-h4 q-mb-md">2019/02/01</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="2019/02/05">
            <div class="text-h4 q-mb-md">2019/02/05</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="2019/02/06">
            <div class="text-h4 q-mb-md">2019/02/06</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref('2019/02/01')
const events =  [ '2019/02/01', '2019/02/05', '2019/02/06' ]
</script>
