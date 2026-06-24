import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'

export const Show = {
  id: 'spontadeity',
  title: 'Spontadeity',
  tags: ['game show', 'comedy', 'premiere'],
  short: 'The game show of the Gods',
} as const satisfies ShowDefinition

export const Route = createFileRoute('/improvising/shows/spontadeity')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <p>
          Spontadeity is a game show where the gods compete to exercise their
          will over a cast of mortal improvisors.
        </p>
        <p>
          Across a series of scenes, the gods will attempt to influence the
          outcome of scenes in a way that reflects their particular domain. The
          audience votes on their phones, awarding tribute based on which way
          they felt the scene went.
        </p>
        <p>
          As the gods gain tribute, they unlock more powerful abilities to help
          tip the scales in their favour. Will they send down a lightning bolt
          at an opportune moment? Strike a character with an amorous arrow? Or
          even disguise themselves as a mortal and enter the scene?
        </p>
        <p>
          This show has not yet been performed. If you’d like to change that,
          get in touch!
        </p>
      </ShowBody>
    </>
  )
}
