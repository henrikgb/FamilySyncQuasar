import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { API_BASE } from 'src/constants/api'
import type { ShoppingListDTO } from 'src/dto/ShoppingListDTO'

export function useShoppingList() {
  return useQuery({
    queryKey: ['shoppingList'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/shoppingList`)
      return res.data
    },
  })
}

export function useUpdateShoppingList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedShoppingList: ShoppingListDTO) => {
      await axios.post(`${API_BASE}/ShoppingList`, updatedShoppingList)
    },
    onSuccess: () => {
      // This tells all components using useUpdateShoppingList() to refetch the data
      void queryClient.invalidateQueries({ queryKey: ['shoppingList'] })
    },
  })
}
