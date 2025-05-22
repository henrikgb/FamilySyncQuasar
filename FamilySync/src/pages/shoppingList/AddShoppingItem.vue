<template>
  <ContainerContent>
    <h6 class="q-my-sm">{{ t('shoppingListPage.title') }}</h6>

    <q-input
      v-model="name"
      :label="whatDoYouWantToBuy"
      filled
      :rules="[val => !!val || nameOnShoppingListItemIsRequired]"
    />

    <q-input
      v-model.number="quantity"
      type="number"
      :label="itemQuantity"
      filled
      :rules="[val => val > 0 || quantityRequired]"
    />

    <q-select
      v-model="category"
      :options="categories"
      :label="itemCategory"
      filled
      emit-value
      map-options
      use-input
      clearable
    />

    <q-btn
      label="Add Item"
      color="teal"
      class="glossy q-mt-md"
      @click="handleAddItem"
    />
  </ContainerContent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useShoppingList, useUpdateShoppingList } from 'src/queries/useShoppingList'
import type { ShoppingListItemDTO } from 'src/dto/ShoppingListDTO'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
import ContainerContent from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue'
const { t } = useI18n()

const whatDoYouWantToBuy = computed(() => t('shoppingListPage.whatDoYouWantToBuy'))
const nameOnShoppingListItemIsRequired = computed(() => t('shoppingListPage.nameIsRequired'))
const itemQuantity = computed(() => t('shoppingListPage.quantity'))
const quantityRequired = computed(() => t('shoppingListPage.quantityMustBePositive'))
const itemCategory = computed(() => t('shoppingListPage.category'))

const name = ref('')
const quantity = ref(1)
const category = ref('')

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

const { data: shoppingList } = useShoppingList()
const updateShoppingList = useUpdateShoppingList()

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
