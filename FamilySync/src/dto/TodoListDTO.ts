export interface TodoListItemDTO {
  title: string,
  isCompleted: boolean,
}

export type TodoListDTO = TodoListItemDTO[]
