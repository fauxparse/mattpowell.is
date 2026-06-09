import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { ThemeToggle } from '../components/ThemeToggle'
import { BoilFilter } from '@/components/BoilFilter.tsx'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'

const BASE_URL = 'https://mattpowell.is'
const OG_IMAGE = `${BASE_URL}/photos/matt-powell-dark-landscape-1280w.jpg`
const DEFAULT_DESCRIPTION =
  'Matt Powell — performer, artist, and developer based in Wellington, Aotearoa New Zealand.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Matt Powell' },
      { property: 'og:image', content: OG_IMAGE },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <ThemeProvider>
      <HeadContent />
      <BoilFilter />
      <ThemeToggle />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </ThemeProvider>
  )
}
