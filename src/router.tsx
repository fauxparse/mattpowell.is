import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import qs from 'query-string'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
    parseSearch: (search) => qs.parse(search, { arrayFormat: 'comma' }),
    stringifySearch: (search) => {
      const searchString = qs.stringify(search, { arrayFormat: 'comma' })

      return searchString ? `?${searchString}` : ''
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
