import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { createWorkshopHead } from '../-components/createWorkshopHead'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'sneaking-up-on-yourself',
  title: 'Sneaking Up on Yourself',
  tags: ['solo', 'structure'],
  duration: 180,
  short: 'Tips and tricks for creating solo improvised work',
} satisfies WorkshopDefinition

export const Route = createFileRoute(
  '/teaching/workshops/sneaking-up-on-yourself',
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
          A lot of the improv training we do is around how to support your scene
          partner. But what about when you’re on your own?
        </p>
        <p>Spoiler: you can be your own scene partner!</p>
        <p>
          I don’t just mean in the literal sense of playing multiple characters
          in the same scene. There are things you can do before, during, and
          after a scene to help you feel supported and lean on the skills you’ve
          learned playing with other people.
        </p>
        <p>
          This workshop explores techniques for building your own solo
          improvised work, from concept to execution, based on my own experience
          developing and touring my solo show, THE HISTORY BOY (nominated for
          Outstanding Solo Performance at the 2021 New Zealand Fringe Festival).
        </p>
      </WorkshopBody>
    </>
  )
}
