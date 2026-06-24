import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'

import DontSeeThisShowAlone from '@/assets/images/dstsa.webp'
import { MaskedImage } from '@/components/MaskedImage'

export const Show = {
  id: 'dont-see-this-show-alone',
  title: 'Don’t See This Show Alone',
  tags: ['ensemble', 'workshop', 'horror'],
  short: 'Improvised horror for real',
  image: DontSeeThisShowAlone,
} as const satisfies ShowDefinition

export const Route = createFileRoute(
  '/improvising/shows/dont-see-this-show-alone',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <p>
          I wanted to create a show that was genuinely scary, not just for the
          audience, but also for the performers.
        </p>
        <p>
          DON’T SEE THIS SHOW ALONE uses large-cast ensemble scenography and
          immersive storytelling to play on the audience’s real fears.
        </p>
        <PullQuote source="Gabby Carbon, Brisbane">
          I was genuinely terrified during this show and had a profoundly
          enjoyable time with some of the horror stories I conjured.
        </PullQuote>
        <p>
          During the three-hour format workshop, we explore how to play
          immersively using a variety of sensory stimuli, as well as how to keep
          one another and our audience safe in a show that is specifically
          designed to push our limits.
        </p>
        <picture className="not-prose w-full max-w-lg mx-auto flex flex-col items-center gap-4">
          <MaskedImage
            orientation="square"
            src={DontSeeThisShowAlone}
            className="w-full aspect-square"
            alt="Liam Webber, Gabby Carbon, and the cast of Don’t See This Show Alone at Big Fork Theatre in 2023. Liam is lying on the ground as half a dozen black-clad performers grab at his body. Gabby is standing in the background, narrating the story."
          />
          <caption className="text-sm text-muted-foreground text-center px-4">
            Liam Webber, Gabby Carbon, and the cast of Don’t See This Show Alone
            at Big Fork Theatre in 2023.
          </caption>
        </picture>
        <p>
          One of my favourite moments from this show was when, during a pre-show
          check-in, one performer said that they would normally say spiders were
          off-limits for them, but they were willing to be scared tonight. Their
          fellow performers gave them a scene about spiders, it was terrifying,
          and they loved it.
        </p>
        <p>
          This show has been performed at the New Zealand Improv Festival
          (2017), the Big Fork Comedy Festival in Brisbane (2023), and the ITS
          Comedy Festival in Sydney (2024).
        </p>
      </ShowBody>
    </>
  )
}
