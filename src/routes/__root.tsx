import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { ThemeToggle } from '../components/ThemeToggle'
import { BoilFilter } from '@/components/BoilFilter.tsx'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'

export const Route = createRootRoute({
  component: RootDocument,
})

function RootDocument() {
  return (
    <ThemeProvider>
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
