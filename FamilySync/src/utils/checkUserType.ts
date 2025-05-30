import { useAuth } from 'src/composables/useAuth'
import { userRoles } from 'src/constants/userRoles'

const { activeAccount } = useAuth()
const roles = activeAccount.value?.idTokenClaims?.roles ?? []

export const isCalendarUserType = roles.includes(userRoles.CALENDAR_USER)
export const isShoppingUserType = roles.includes(userRoles.SHOPPING_USER)
export const isTodoUserType = roles.includes(userRoles.TODO_USER)
