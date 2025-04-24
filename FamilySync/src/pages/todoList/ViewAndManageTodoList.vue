<template>
  <div class="bg-yellow-3 q-pa-md rounded-borders w-100">
    <div v-if="isLoading" class="text-center q-mt-lg">
      <q-spinner color="teal" size="50px" />
      <div class="w-full">
        <text-h4>Loading</text-h4>
      </div>
    </div>
    <div v-else>
      <h6 class="q-my-sm">{{ $t('todoListPage.todoList') }}:</h6>
      <q-card
        v-for="(tasks, category) in groupedTasks"
        :key="category"
        class="q-mb-md bg-yellow-2"
      >
        <q-expansion-item :label="category" expand-separator>
          <q-card-section
            v-for="task in tasks"
            :key="task.task + task.category"
            class="row items-center q-pa-sm"
          >
            <!-- Item info & toggle -->
            <div class="col-9 row items-center">
              <q-toggle
                v-model="task.isCompleted"
                @update:model-value="val => toggleCompleted(task, val)"
                dense
                size="sm"
                color="green"
                :label="`${task.task}`"
                :class="{ 'text-strike': task.isCompleted }"
              />
            </div>

            <!-- Delete button -->
            <div class="col-3 text-right">
              <q-btn
                flat
                round
                icon="delete"
                color="negative"
                @click="deleteTask(task)"
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
import { useTodoList, useUpdateTodoList } from 'src/queries/useTodoList'
import type { TodoListItemDTO } from 'src/dto/TodoListDTO'
import { Notify } from 'quasar'

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

<style scoped>
.text-strike {
  text-decoration: line-through;
  color: #888;
}
</style>
