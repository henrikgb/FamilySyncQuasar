import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { API_BASE } from 'src/constants/api'
import type { ShoppingListDTO } from 'src/dto/ShoppingListDTO'
import { getAccessToken } from 'src/utils/getAccessToken'

export function useShoppingList() {
  return useQuery({
    queryKey: ['shoppingList'],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if(!accessToken) {
        throw new Error('Not authenticated')
      }

      const res = await axios.get(`${API_BASE}/ShoppingList`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data
    },
  })
}

export function useUpdateShoppingList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedShoppingList: ShoppingListDTO) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated')
      }

      await axios.post(`${API_BASE}/ShoppingList`, updatedShoppingList, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shoppingList'] })
    },
  })
}
