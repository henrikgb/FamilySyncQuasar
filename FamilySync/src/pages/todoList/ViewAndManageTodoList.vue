<template>
  <ContentContainer>
    <LoadingAnimation v-if="isLoading" />
    <GroupedChecklists
      v-else
      :title="t('todoListPage.todoList')"
      icon="📝"
      :groupedItems="groupedTasks"
      :keyFn="(task: TodoListItemDTO) => task.task + task.category"
      :labelFn="(task: TodoListItemDTO) => `${task.task}`"
      :toggleCompleted="toggleCompleted"
      :deleteFn="deleteTask"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useTodoList, useUpdateTodoList } from 'src/queries/useTodoList'
import type { TodoListItemDTO } from 'src/dto/TodoListDTO'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
import ContentContainer from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue'
import LoadingAnimation from 'src/components/pageLayoutBuildingBlocks/LoadingAnimation.vue'
import GroupedChecklists from 'src/components/pageLayoutBuildingBlocks/GroupedChecklists.vue'

const { t } = useI18n()

const { data: todoList, isLoading } = useTodoList()
const updateTodoList = useUpdateTodoList()
const localList = ref<TodoListItemDTO[]>([])

watchEffect(() => {
  if (todoList.value) {
    localList.value = [...todoList.value]
  }
})

const groupedTasks = computed(() => {
  const groups: Record<string, TodoListItemDTO[]> = {}
  localList.value.forEach((task) => {
    const categoryKey = task.category || 'Uncategorized'
    if (!groups[categoryKey]) groups[categoryKey] = []
    groups[categoryKey].push(task)
  })
  return groups
})

async function toggleCompleted(task: TodoListItemDTO, newValue: boolean) {
  const updated = localList.value.map(i =>
    i.task === task.task && i.category === task.category
      ? { ...i, isCompleted: newValue }
      : i
  )

  try {
    await updateTodoList.mutateAsync(updated)
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

async function deleteTask(taskToDelete: TodoListItemDTO) {
  const updated = localList.value.filter(
    i => !(i.task === taskToDelete.task && i.category === taskToDelete.category)
  )

  try {
    await updateTodoList.mutateAsync(updated)
    localList.value = updated
    Notify.create({
      message: 'Oppgave i todo-liste slettet',
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
