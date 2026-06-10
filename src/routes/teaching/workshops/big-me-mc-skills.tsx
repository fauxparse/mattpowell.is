import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'big-me-mc-skills',
  title: 'Big Me: MC Skills',
  tags: ['MCing', 'confidence', 'character'],
  duration: 180,
  short: 'Discover your MC persona',
} satisfies WorkshopDefinition

export const Route = createFileRoute('/teaching/workshops/big-me-mc-skills')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <WorkshopHeader workshop={Workshop} />
      <WorkshopBody workshop={Workshop}>
        <p>
          I often see MCs and hosts trying to hold a room with techniques
          they’ve cribbed from watching other MCs, and being surprised or
          confused when these bits don’t land as well for them.
        </p>
        <p>
          MCing a show is just playing a character, and the best character to
          play is a version of yourself who is really good at MCing.
        </p>
        <p>
          In this workshop I’ll help you discover your unique MC persona, how to
          use it to keep a show running smoothly, and how you can tap into it
          when things don’t go so well.
        </p>
        <p>
          I’ve been teaching this workshop in various forms since 2016, and I’ve
          never met two people who MC the same way by the end of it.
        </p>
      </WorkshopBody>
    </>
  )
}
