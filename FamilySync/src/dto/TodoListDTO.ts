export interface TodoListItemDTO {
  task: string,
  category: string,
  isCompleted: boolean,
}

export type TodoListDTO = TodoListItemDTO[]
