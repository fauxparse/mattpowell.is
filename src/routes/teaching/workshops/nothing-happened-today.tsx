import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { createWorkshopHead } from '../-components/createWorkshopHead'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'nothing-happened-today',
  title: 'Nothing Happened Today',
  tags: ['structure', 'scenework'],
  duration: 180,
  short: 'How to play scenes where nothing happens — and why you should',
} satisfies WorkshopDefinition

export const Route = createFileRoute(
  '/teaching/workshops/nothing-happened-today',
)({
  component: RouteComponent,
  head: () => createWorkshopHead(Workshop),
})

function RouteComponent() {
  return (
    <>
      <WorkshopHeader workshop={Workshop} />
      <WorkshopBody workshop={Workshop}>
        <p>
          This workshop is an exploration of how little plot we can get away
          with in a scene, focusing instead on the relationship between the
          characters in the moment. How much can we read from subtle context
          clues? How much history can we assume without having to make it
          explicit?
        </p>
        <p>
          This was originally a short scenework intensive course taught with
          Locomotive in 2022. I’ve tak some of the discoveries and exercises
          from that course and distilled them into a 3-hour workshop that is
          perfect for a festival.
        </p>
      </WorkshopBody>
    </>
  )
}
