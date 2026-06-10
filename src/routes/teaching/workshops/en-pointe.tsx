import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from './-components/types'
import { WorkshopHeader } from './-components/WorkshopHeader'
import { WorkshopBody } from './-components/WorkshopBody'

export const Workshop = {
  id: 'en-pointe',
  title: 'En Pointe',
  tags: ['physical', 'scenework'],
  duration: 180,
  short: 'Use techniques from ballet to create engaging physical scenes',
} satisfies WorkshopDefinition

export const Route = createFileRoute('/teaching/workshops/en-pointe')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <WorkshopHeader workshop={Workshop} />
      <WorkshopBody workshop={Workshop}>
        <p>
          Before I ever started improvising, I spent nine years training in
          ballet. Then, when I started watching improv shows, I would regularly
          see players performing “ballet” scenes, which mostly consisted of
          people plonking around the stage doing anything but ballet.
        </p>
        <p>
          This annoyed me, because dance is an extremely expressive way to tell
          stories visually. Too much improv is stuck in “number elevens”: two
          people standing at arm’s length explaining the plot to each other.
        </p>
        <p>
          The first half of this workshop is a crash course in ballet technique,
          including basic movement vocabulary, body positioning, and what to do
          with your arms. You’ll even learn how to lift your scene partner
          safely.
        </p>
        <p>
          The second half of the workshop explores how we can use those
          techniques to tell visually engaging stories, as well as what we can
          apply in our more “regular” improv scenes.
        </p>
        <p>
          I’ve taught versions of this workshop at the New Zealand Improv
          Festival, as well as at Improvention in Canberra, and I’d love to come
          and teach it to you.
        </p>
      </WorkshopBody>
    </>
  )
}
