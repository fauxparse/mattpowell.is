import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { createWorkshopHead } from '../-components/createWorkshopHead'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'starting-over-and-over',
  title: 'Starting Over and Over',
  tags: ['structure', 'confidence'],
  duration: 180,
  short: 'Explore over a hundred different ways to start a scene',
} satisfies WorkshopDefinition

export const Route = createFileRoute(
  '/teaching/workshops/starting-over-and-over',
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
          There are a million different ways to start an improv scene, but I
          don’t know that I regularly use more than about half a dozen. In this
          workshop we’ll try and find as many of the rest as possible.
        </p>
        <p>
          Using a variety of ideation and discovery techniques, coupled with as
          much practical application as possible, participants will unlock new
          ways to get a scene on its feet, and come away with a whole sack full
          of fresh ideas to jump-start their next scenes.
        </p>
        <p>
          I first taught this workshop at the New Zealand Improv Festival in
          2025, where we found over a hundred different ways to start a scene.
          I’d love to see how many more we can find together.
        </p>
      </WorkshopBody>
    </>
  )
}
