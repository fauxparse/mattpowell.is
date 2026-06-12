import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { createWorkshopHead } from '../-components/createWorkshopHead'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'the-idiot',
  title: 'The Idiot',
  tags: ['character'],
  duration: 180,
  short: 'Play with characters who know less than they should',
} satisfies WorkshopDefinition

export const Route = createFileRoute('/teaching/workshops/the-idiot')({
  component: RouteComponent,
  head: () => createWorkshopHead(Workshop),
})

function RouteComponent() {
  return (
    <>
      <WorkshopHeader workshop={Workshop} />
      <WorkshopBody workshop={Workshop}>
        <p>
          I’m fascinated by the idea that there can be a gap between what we
          know as actors, and what our characters know.
        </p>
        <p>
          This workshop explores how we can play with the concept of dramatic
          irony, creating scenes where the actors and the audience all know
          what’s going on, but the character is blissfully unaware. Maybe the
          other person is trying to flirt with them, rob them, or just get one
          over on them. Or maybe they’re just an idiot.
        </p>
        <p>
          Put aside the idea of “playing to the top of your intelligence”, and
          spend some time being obtuse on purpose. Heavily inspired by the work
          of the Coen Brothers, Steve Kaplan, and the game{' '}
          <a
            className="link"
            href="https://www.bullypulpitgames.com/fiasco/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fiasco
          </a>{' '}
          from Bully Pulpit Games.
        </p>
        <p>
          I first taught this workshop at the New Zealand Improv Festival in
          2024, and I’d love to come and teach it to you.
        </p>
      </WorkshopBody>
    </>
  )
}
