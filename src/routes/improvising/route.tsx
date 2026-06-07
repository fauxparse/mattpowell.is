import { SectionPage } from '@/components/SectionPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/improvising')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Matt Powell is improvising',
      },
    ],
  }),
})

function RouteComponent() {
  return (
    <SectionPage title="improvising">
      <p>Improvising</p>
    </SectionPage>
  )
}
