import { createFileRoute } from '@tanstack/react-router'
import type { Workshop as WorkshopDefinition } from '../-components/types'
import { WorkshopHeader } from '../-components/WorkshopHeader'
import { WorkshopBody } from '../-components/WorkshopBody'

export const Workshop = {
  id: 'reading-the-scene',
  title: 'Reading the Scene',
  tags: ['character', 'scenework'],
  duration: 180,
  short: 'Playing with what’s already in front of you',
} satisfies WorkshopDefinition

export const Route = createFileRoute('/teaching/workshops/reading-the-scene')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <WorkshopHeader workshop={Workshop} />
      <WorkshopBody workshop={Workshop}>
        <p>
          It’s natural to think about our role as an improvisor as being like a
          playwright, furiously scribbling down lines of dialogue fractions of a
          second before they come out of the characters’ mouths. But if that’s
          where our focus is, we can miss out on everything else.
        </p>
        <p>
          This workshop is about switching our brains from “writing” mode to
          “reading” mode, to pick up on subtle cues we might otherwise miss, but
          which the audience has often already spotted. You’ll talk less and
          listen more, you’ll ask fewer questions and make more bold
          assumptions, and your characters and relationships will feel more
          alive.
        </p>
        <p>
          This is the workshop that feels closest to the sort of improv I love
          to play and to watch. I’ve been teaching versions of it for over a
          decade, including in French (at FÉRIIR in La Réunion) and Spanish (in
          Lima and Cusco, Peru), and I’d love to come and teach it to you.
        </p>
      </WorkshopBody>
    </>
  )
}
