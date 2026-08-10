import { boot } from 'quasar/wrappers'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default boot(({ app }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
      },
    },
  })

  app.use(VueQueryPlugin, {
    queryClient,
  })
})
