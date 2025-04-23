<template>
  <div class="bg-yellow-3 q-pa-md rounded-borders w-100">
    <h6 class="q-my-sm">{{ t('todoListPage.addTodoListItem') }}</h6>

    <!-- Task input (required) -->
    <q-input
      v-model="task"
      :label="describeTask"
      filled
      class="q-mb-sm"
      :rules="[val => !!val || taskDescriptionRequired]"
    />

    <!-- Category select (optional, default fallback handled in script) -->
    <q-select
      v-model="category"
      :options="categories"
      :label="taskCategory"
      filled
      class="q-mb-sm"
      emit-value
      map-options
      use-input
      clearable
    />

    <!-- Add button -->
    <div class="row justify-end">
      <q-btn
        :label="addTask"
        color="teal"
        class="glossy"
        @click="handleAddTask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoList, useUpdateTodoList } from 'src/queries/useTodoList'
import type { TodoListItemDTO } from 'src/dto/TodoListDTO'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Text on page
const describeTask = computed(() => t('todoListPage.describeYourTask'))
const taskDescriptionRequired = computed(() => t('todoListPage.taskDescriptionIsRequired'))
const taskCategory = computed(() => t('todoListPage.category'))
const addTask = computed(() => t('todoListPage.addTask'))

// Form state
const task = ref('')
const category = ref('')

// Example category options
const categories = [
  'Oppussing',
  'Husvask',
  'Hagearbeid',
  'Diverse',
]

// Data fetch and mutation
const { data: todoList } = useTodoList()
const updateTodoList = useUpdateTodoList()

// Add new item to list and update API
const handleAddTask = async () => {
  if (!task.value) {
    Notify.create({
      message: "Please fill in all required fields",
      color: 'red',
      icon: 'error',
    })
    return
  }
  else {
    const newList: TodoListItemDTO[] = [
      ...todoList.value,
      {
        task: task.value,
        category: category.value || "No category",
        isCompleted: false,
      }
    ]
    try {
      await updateTodoList.mutateAsync(newList)
      Notify.create({
        message: "Successfully added task",
        color: 'green',
        icon: 'check',
      })

      // Reset form
      task.value = ''
      category.value = ''
    } catch {
      Notify.create({
        message: "Adding task failed",
        color: 'red',
        icon: 'error',
      })
    }
  }
}
</script>
