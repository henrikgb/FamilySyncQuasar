import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import { API_BASE } from 'src/constants/api'
import type { TodoListDTO } from 'src/dto/TodoListDTO'

export function useTodoList() {
  return useQuery({
    queryKey: ['todoList'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/todoList`)
      return res.data
    },
  })
}

export function useUpdateTodoList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedTodos: TodoListDTO) => {
      await axios.post(`${API_BASE}/todoList`, updatedTodos)
    },
    onSuccess: () => {
      // This tells all components using useUpdateTodoList() to refetch the data
      void queryClient.invalidateQueries({ queryKey: ['todoList'] })
    },
  })
}
