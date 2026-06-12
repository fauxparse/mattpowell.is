import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { ThemeToggle } from '../components/ThemeToggle'
import { BoilFilter } from '@/components/BoilFilter.tsx'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'
import { SITE_DEFAULT_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE } from '@/lib/site'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: SITE_DEFAULT_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:image', content: SITE_OG_IMAGE },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: SITE_OG_IMAGE },
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
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
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
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
