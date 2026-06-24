import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'

export const Show = {
  id: 'cupids-guide-to-modern-romance',
  title: 'Cupid’s Guide to Modern Romance',
  tags: ['comedy'],
  short: 'An improvised romantic comedy',
} as const satisfies ShowDefinition

export const Route = createFileRoute(
  '/improvising/shows/cupids-guide-to-modern-romance',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <p>
          CUPID’S GUIDE TO MODERN ROMANCE is an improvised romantic comedy
          following two characters navigating the early stages of a
          relationship. I play Cupid, and, with the help of the audience, help
          them make the right choices.
        </p>
        <PullQuote
          source="Inés Maria Almeida, Theatreview"
          link="https://www.theatreview.org.nz/production/cupids-guide-to-modern-romance/#for-the-lovesick-and-lovelorn-and-anyone-in-between"
        >
          Take a leap of faith when it comes to matters of the heart.
        </PullQuote>
        <p>
          The show was initially trialled as part of Late Night Knife Fight in
          August 2020, with Pippa Drakeford and Nina Hogg. It went on to
          headline the September show, and then to a season in the 2021 New
          Zealand Fringe Festival, where we were joined by Alayne Dick.
        </p>
        <p>
          I also mounted a version of the show at the Big Fork Comedy Festival
          in Brisbane in 2025, with Janette McBride and Rosa Sottile.
        </p>
        <p>This is a heartwarming, sincere show for any audience.</p>
      </ShowBody>
    </>
  )
}
