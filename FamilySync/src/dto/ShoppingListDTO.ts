export interface ShoppingListItemDTO {
  name: string,
  quantity: number,
  isCompleted: boolean,
  category?: string,
}

export type ShoppingListDTO = ShoppingListItemDTO[]
