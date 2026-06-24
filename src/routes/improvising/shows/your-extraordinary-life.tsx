import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'

export const Show = {
  id: 'your-extraordinary-life',
  title: 'Your Extraordinary Life',
  tags: ['comedy', 'workshop'],
  short: 'A show about a very special audience member',
} as const satisfies ShowDefinition

export const Route = createFileRoute(
  '/improvising/shows/your-extraordinary-life',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <p>
          YOUR EXTRAORDINARY LIFE creates a show around the real life
          experiences of a real audience member.
        </p>
        <p>
          To me, one of the quintessential features of improv is that it invites
          the audience to collaborate in its creation. What could be more direct
          than inviting an audience member to join the cast?
        </p>
        <PullQuote
          source="Chris Hobbs, Theatreview"
          link="https://www.theatreview.org.nz/production/your-extraordinary-life/#carried-off-with-aplomb-and-charm"
        >
          …underneath, we’re all extraordinary.
        </PullQuote>
        <p>
          Before the show, we ask audience members to fill in a brief survey
          about their life. We pick someone we think will be interesting, and
          then divert them backstage as they enter the theatre so we can prepare
          them for the show (and take their drink order).
        </p>
        <p>
          From there, the show follows a classic “This Is Your Life” format,
          with the cast playing various characters from the audience member's
          life and recounting their stories.
        </p>
        <p>
          I developed this show for the 2021 New Zealand Improv Festival, where
          I taught the format in a three-hour workshop focusing on how to take
          care of audience members on stage. All the normal rules of improv
          apply (especially “make your scene partner look good”), but their
          offers tend to be either a little wilder than we’re used to, or a
          little more timid, so we need to be adaptable and responsive.
        </p>
      </ShowBody>
    </>
  )
}
