<template>
  <q-page class="column items-center q-pt-sm">
    <q-layout class="q-px-lg q-py-lg">
      <div class="q-gutter-lg">
        <AddTodoListItem />
        <ViewAndManageTodoList />
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import AddTodoListItem from './AddTodoListItem.vue'
import ViewAndManageTodoList from './ViewAndManageTodoList.vue';

//...
</script>
