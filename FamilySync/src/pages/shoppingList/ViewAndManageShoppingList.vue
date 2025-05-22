<template>
  <ContentContainer>
    <LoadingAnimation v-if="isLoading" />
    <GroupedChecklists
      v-else
      :title="t('shoppingListPage.shoppingList')"
      icon="🛒"
      :groupedItems="groupedItems"
      :keyFn="(item: ShoppingListItemDTO) => item.name + item.category"
      :labelFn="(item: ShoppingListItemDTO) => `${item.name} (${item.quantity} stk)`"
      :toggleCompleted="toggleCompleted"
      :deleteFn="deleteItem"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useShoppingList, useUpdateShoppingList } from 'src/queries/useShoppingList'
import type { ShoppingListItemDTO } from 'src/dto/ShoppingListDTO'
import { Notify } from 'quasar'
import ContentContainer from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue'
import LoadingAnimation from 'src/components/pageLayoutBuildingBlocks/LoadingAnimation.vue'
import GroupedChecklists from 'src/components/pageLayoutBuildingBlocks/GroupedChecklists.vue'
const { data: shoppingList, isLoading } = useShoppingList()
const { t } = useI18n()
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
