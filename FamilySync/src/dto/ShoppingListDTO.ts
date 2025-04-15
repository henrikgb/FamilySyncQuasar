export interface ShoppingListItemDTO {
  name: string,
  quantity: number,
  isCompleted: boolean,
}

export type ShoppingListDTO = ShoppingListItemDTO[]
