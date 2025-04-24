<template>
  <div class="bg-yellow-3 q-pa-md rounded-borders w-100">
    <div v-if="isLoading" class="text-center q-mt-lg">
      <q-spinner color="teal" size="50px" />
      <div class="w-full">
        <text-h4>Loading</text-h4>
      </div>
    </div>
    <div v-else>
      <h6 class="q-my-sm">{{ $t('shoppingListPage.shoppingList') }}:</h6>
      <q-card
        v-for="(items, category) in groupedItems"
        :key="category"
        class="q-mb-md bg-yellow-2"
      >
      <q-expansion-item
        :label="`${category.toUpperCase()} -
        🛒 ${items.length} |
        ✅ ${items.filter(item => item.isCompleted).length} |
        ⏳ ${items.filter(item => !item.isCompleted).length}`"
        expand-separator
      >
          <q-card-section
            v-for="item in items"
            :key="item.name + item.category"
            class="row items-center q-pa-sm"
          >
            <!-- Item info & toggle -->
            <div class="col-9 row items-center">
              <q-toggle
                v-model="item.isCompleted"
                @update:model-value="val => toggleCompleted(item, val)"
                dense
                size="sm"
                color="green"
                :label="`${item.name} (${item.quantity} stk)`"
                :class="{ 'text-strike': item.isCompleted }"
              />
            </div>

            <!-- Delete button -->
            <div class="col-3 text-right">
              <q-btn
                flat
                round
                icon="delete"
                color="negative"
                @click="deleteItem(item)"
              />
            </div>
          </q-card-section>

        </q-expansion-item>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useShoppingList, useUpdateShoppingList } from 'src/queries/useShoppingList'
import type { ShoppingListItemDTO } from 'src/dto/ShoppingListDTO'
import { Notify } from 'quasar'

const { data: shoppingList, isLoading } = useShoppingList()
const updateShoppingList = useUpdateShoppingList()

const localList = ref<ShoppingListItemDTO[]>([])

watchEffect(() => {
  if (shoppingList.value) {
    localList.value = [...shoppingList.value]
  }
})

const groupedItems = computed(() => {
  const groups: Record<string, ShoppingListItemDTO[]> = {}
  localList.value.forEach((item) => {
    const categoryKey = item.category || 'Uncategorized'
    if (!groups[categoryKey]) groups[categoryKey] = []
    groups[categoryKey].push(item)
  })
  return groups
})

async function toggleCompleted(item: ShoppingListItemDTO, newValue: boolean) {
  const updated = localList.value.map(i =>
    i.name === item.name && i.category === item.category
      ? { ...i, isCompleted: newValue }
      : i
  )

  try {
    await updateShoppingList.mutateAsync(updated)
    localList.value = updated
    Notify.create({
      message: 'Oppdatert fullført-status',
      color: 'green',
      icon: 'check',
    })
  } catch {
    Notify.create({
      message: 'Kunne ikke oppdatere status',
      color: 'red',
      icon: 'error',
    })
  }
}

async function deleteItem(itemToDelete: ShoppingListItemDTO) {
  const updated = localList.value.filter(
    i => !(i.name === itemToDelete.name && i.category === itemToDelete.category)
  )

  try {
    await updateShoppingList.mutateAsync(updated)
    localList.value = updated
    Notify.create({
      message: 'Handlelisteelement slettet',
      color: 'green',
      icon: 'check',
    })
  } catch {
    Notify.create({
      message: 'Sletting feilet',
      color: 'red',
      icon: 'error',
    })
  }
}
</script>

<style scoped>
.text-strike {
  text-decoration: line-through;
  color: #888;
}
</style>
