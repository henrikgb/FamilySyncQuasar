<template>
  <div class="bg-yellow-3 q-pa-md rounded-borders w-100">
    <h6 class="q-my-sm">{{ t('shoppingListPage.title') }}</h6>

    <!-- Name input (required) -->
    <q-input
      v-model="name"
      :label="whatDoYouWantToBuy"
      filled
      class="q-mb-sm"
      :rules="[val => !!val || nameOnShoppingListItemIsRequired]"
    />

    <!-- Quantity input (default = 1, must be > 0) -->
    <q-input
      v-model.number="quantity"
      type="number"
      :label="itemQuantity"
      filled
      class="q-mb-sm"
      :rules="[val => val > 0 || quantityRequired]"
    />

    <!-- Category select (optional, default fallback handled in script) -->
    <q-select
      v-model="category"
      :options="categories"
      :label="itemCategory"
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
import { ref, computed } from 'vue'
import { useShoppingList, useUpdateShoppingList } from 'src/queries/useShoppingList'
import type { ShoppingListItemDTO } from 'src/dto/ShoppingListDTO'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Text on page
const whatDoYouWantToBuy = computed(() => t('shoppingListPage.whatDoYouWantToBuy'))
const nameOnShoppingListItemIsRequired = computed(() => t('shoppingListPage.nameIsRequired'))
const itemQuantity = computed(() => t('shoppingListPage.quantity'))
const quantityRequired = computed(() => t('shoppingListPage.quantityMustBePositive'))
const itemCategory = computed(() => t('shoppingListPage.category'))

// Form state
const name = ref('')
const quantity = ref(1)
const category = ref('')

// Example category options
const categories = [
  'Bakervarer',
  'Grønnsaker & Frukt',
  'Kjøtt & Pålegg',
  'Meieriprodukter',
  'Frysevarer',
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
