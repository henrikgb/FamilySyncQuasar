<template>
  <div v-if="groupedItems && Object.keys(groupedItems).length">
    <h6 class="q-my-sm">{{ title }}:</h6>
    <q-card
      v-for="(items, category) in groupedItems"
      :key="category"
      class="q-mb-md bg-yellow-2"
    >
      <q-expansion-item
        :label="`${category.toUpperCase()} -
          ${icon} ${items.length} |
          ✅ ${items.filter(item => item.isCompleted).length} |
          ⏳ ${items.filter(item => !item.isCompleted).length}`"
        expand-separator
      >
        <q-card-section
          v-for="item in items"
          :key="keyFn(item)"
          class="row items-center q-pa-sm"
        >
          <div class="col-9 row items-center">
            <q-toggle
              v-model="item.isCompleted"
              @update:model-value="val => toggleCompleted(item, val)"
              dense
              size="sm"
              color="green"
              :label="labelFn(item)"
              :class="{ 'text-strike': item.isCompleted }"
            />
          </div>
          <div class="col-3 text-right">
            <q-btn
              flat
              round
              icon="delete"
              color="negative"
              @click="deleteFn(item)"
            />
          </div>
        </q-card-section>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<script setup lang="ts" generic="T extends { isCompleted: boolean }">
defineProps<{
  title: string
  icon: string
  groupedItems: Record<string, T[]>
  keyFn: (item: T) => string
  labelFn: (item: T) => string
  toggleCompleted: (item: T, value: boolean) => void
  deleteFn: (item: T) => void
}>()
</script>

<style scoped>
.text-strike {
  text-decoration: line-through;
  color: #888;
}
</style>
