<template>
  <ContainerContent>
    <h6 class="q-my-sm">{{ t('todoListPage.addTodoListItem') }}</h6>

    <q-input
      v-model="task"
      :label="describeTask"
      filled
      :rules="[val => !!val || taskDescriptionRequired]"
    />

    <q-select
      v-model="category"
      :options="categories"
      :label="taskCategory"
      filled
      emit-value
      map-options
      use-input
      clearable
    />

    <q-btn
      :label="addTask"
      color="teal"
      class="glossy q-mt-md"
      @click="handleAddTask"
    />
  </ContainerContent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoList, useUpdateTodoList } from 'src/queries/useTodoList'
import type { TodoListItemDTO } from 'src/dto/TodoListDTO'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
import ContainerContent from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue'
const { t } = useI18n()

const describeTask = computed(() => t('todoListPage.describeYourTask'))
const taskDescriptionRequired = computed(() => t('todoListPage.taskDescriptionIsRequired'))
const taskCategory = computed(() => t('todoListPage.category'))
const addTask = computed(() => t('todoListPage.addTask'))

const task = ref('')
const category = ref('')

const categories = [
  'Oppussing',
  'Husvask',
  'Hagearbeid',
  'Diverse',
]

const { data: todoList } = useTodoList()
const updateTodoList = useUpdateTodoList()

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
