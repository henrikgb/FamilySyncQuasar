import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { API_BASE } from 'src/constants/api'
import type { TodoListItemDTO } from 'src/dto/TodoListDTO'
import { getAccessToken } from 'src/utils/getAccessToken'

export function useTodoList() {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: async () => {
      const accessToken = await getAccessToken()
      if (!accessToken) {
        throw new Error('Not authenticated')
      }

      const res = await axios.get(`${API_BASE}/TodoList`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data
    },
  })
}

export function useUpdateTodoList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedTodos: TodoListItemDTO[]) => {
      await axios.post(`${API_BASE}/todoList`, updatedTodos)
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated')
      }

      await axios.post(`${API_BASE}/TodoList`, updatedTodos, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      // This tells all components using useUpdateTodoList() to refetch the data
      void queryClient.invalidateQueries({ queryKey: ['todoList'] })
    },
  })
}
