import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { createWorkshopHead } from '../-components/createWorkshopHead'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'scenes-that-suck',
  title: 'Scenes That Suck',
  tags: ['confidence', 'scenework'],
  duration: 360,
  short: 'Experience real failure in a controlled environment',
} satisfies WorkshopDefinition

export const Route = createFileRoute('/teaching/workshops/scenes-that-suck')({
  component: RouteComponent,
  head: () => createWorkshopHead(Workshop),
})

function RouteComponent() {
  return (
    <>
      <WorkshopHeader workshop={Workshop} />
      <WorkshopBody workshop={Workshop}>
        <blockquote className="text-2xl text-balance not-italic border-0 not-prose panel w-fit">
          <p className="p-0 w-fit">
            “You never truly know an improvisor until you’ve seen them eat shit
            on stage.”
          </p>
        </blockquote>
        <p>
          We all have scenes that suck. One of the hardest experiences as an
          improvisor is coming off stage with a real stinker of a scene sitting
          in the pit of your stomach, knowing your friends are waiting at the
          bar to tell you what a great show you had. It’s even harder if the bad
          scene happens near the start of the show, and you have to tits’n’teeth
          your way through another 45 minutes.
        </p>
        <p>
          If we only allow ourselves to experience this feeling in the context
          of a show, the stage becomes a place of fear, and we learn to protect
          ourselves by armouring our improv against risk and adventure. Thus,
          many workshops and teaching styles (including my own) seek to address
          failure as a concept head-on, but often by framing the workshop as a
          place to fail without consequences. The very real gap between a
          low-stakes failure in front of a group of peers and a high-stakes
          failure in front of a paying audience is seldom acknowledged.
        </p>
        <p>
          SCENES THAT SUCK seeks to create a space to not only experience the
          failure itself, but to sit with the feeling of having failed. We won’t
          try to do bad improv, but we will set up scenes where participants are
          encouraged to push past their comfort zones to the point of failure.
          We will explicitly and honestly address what went wrong in the scene
          and why it was your fault. Then we will get up and do more scenes.
        </p>
        <p>
          My ideal way to run this workshop would be as a whole-day intensive.
          Before the workshop, I would ask participants for any areas they want
          to push on, and anything they’d like to really steer clear of. In the
          morning, we would run scenes that suck, then we would have a lunch
          break where I would encourage participants to take some time to be by
          themselves. In the afternoon we would have a check-in and then run
          scenes that don’t suck, partially as a kind of palate cleanser, and
          partially as a way to celebrate together.
        </p>
      </WorkshopBody>
    </>
  )
}
