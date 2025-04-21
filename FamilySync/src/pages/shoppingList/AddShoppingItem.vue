<template>
  <div class="bg-yellow-3 q-pa-md rounded-borders w-100">
    <h6 class="q-my-sm">Add Items</h6>

    <!-- Name input (required) -->
    <q-input
      v-model="name"
      label="Hva vil du kjøpe?"
      filled
      class="q-mb-sm"
      :rules="[val => !!val || 'Name on shopping list item is required']"
    />

    <!-- Quantity input (default = 1, must be > 0) -->
    <q-input
      v-model.number="quantity"
      type="number"
      label="Quantity"
      filled
      class="q-mb-sm"
      :rules="[val => val > 0 || 'Quantity must be a positive number greater than 0']"
    />

    <!-- Category select (optional, default fallback handled in script) -->
    <q-select
      v-model="category"
      :options="categories"
      label="Category"
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
        label="Add Item"
        color="teal"
        class="glossy"
        @click="handleAddItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShoppingList, useUpdateShoppingList } from 'src/queries/useShoppingList'
import type { ShoppingListItemDTO } from 'src/dto/ShoppingListDTO'
import { Notify } from 'quasar'

// Form state
const name = ref('')
const quantity = ref(1)
const category = ref('')

// Example category options
const categories = [
  'Grønnsaker & Frukt',
  'Kjøtt & Pålegg',
  'Diverse',
  'Husholdning',
  'Drikke',
  'Snacks'
]

// Data fetch and mutation
const { data: shoppingList } = useShoppingList()
const updateShoppingList = useUpdateShoppingList()

// Add new item to list and update API
const handleAddItem = async () => {
  if (!name.value || quantity.value <= 0) {
    Notify.create({
      message: "Please fill in all required fields",
      color: 'red',
      icon: 'error',
    })
    return
  }
  else {
    const newList: ShoppingListItemDTO[] = [
      ...shoppingList.value,
      {
        name: name.value,
        quantity: quantity.value,
        category: category.value || "No category",
        isCompleted: false,
      }
    ]
    try {
      await updateShoppingList.mutateAsync(newList)
      Notify.create({
        message: "Successfully added shopping item",
        color: 'green',
        icon: 'check',
      })

      // Reset form
      name.value = ''
      quantity.value = 1
      category.value = ''
    } catch {
      Notify.create({
        message: "Adding shopping item failed",
        color: 'red',
        icon: 'error',
      })
    }
  }
}
</script>
