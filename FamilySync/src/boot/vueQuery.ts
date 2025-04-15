import { boot } from 'quasar/wrappers'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default boot(({ app }) => {
  const queryClient = new QueryClient()

  app.use(VueQueryPlugin, {
    queryClient,
  })
})
