import { createFileRoute } from '@tanstack/react-router'
import type { Show as ShowDefinition } from '../-components/types'
import { ShowHeader } from '../-components/ShowHeader'
import { ShowBody } from '../-components/ShowBody'
import { PullQuote } from '@/components/PullQuote'
import { AwardIcon } from 'lucide-react'

import TRex from '@/assets/images/t-rex.png'
import TheHistoryBoy from '@/assets/images/thb.webp'

export const Show = {
  id: 'the-history-boy',
  title: 'The History Boy',
  tags: ['solo', 'history', 'comedy'],
  short: 'Real history, made up',
  image: TheHistoryBoy,
} as const satisfies ShowDefinition

export const Route = createFileRoute('/improvising/shows/the-history-boy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ShowHeader show={Show} />
      <ShowBody show={Show}>
        <div
          className="panel not-prose flex flex-col gap-2 before:border-2 before:border-[currentColor] before:bg-[#FFF1FA] text-[#954287]"
          style={{
            backgroundImage: `url(${TRex})`,
            backgroundSize: '10rem',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h3 className="text-xl">
            Don’t miss <b className="uppercase">The Natural History Boy</b> at
            Tahi Festival 2026!
          </h3>
          <p className="pr-[20%]">
            A special re-imagining of THE HISTORY BOY, focusing on your
            favourite weird and wonderful animal facts.
          </p>
          <p>16–19 September at BATS, Wellington</p>
        </div>
        <p>
          We all carry a version of history around with us in our heads, a kind
          of soup of everything we’ve ever read, been told, or misremembered.
          THE HISTORY BOY is a show about that version of history, and how it’s
          just as real as any other.
        </p>
        <p>
          Each night I invite the audience to share their favourite weird and
          wonderful historical facts, and then I build a show around them.
        </p>
        <PullQuote
          source="Malcolm Morrison, Theatreview"
          link="https://www.theatreview.org.nz/production/the-history-boy/#three-stories-invented-and-interwoven-with-cultivated-wit"
        >
          Powell really gets to show off his cultivated wit and ability to think
          on his feet in this format, developed from decades of performing.
        </PullQuote>
        <p>
          THE HISTORY BOY was first performed as part of Late Night Knife Fight
          in 2019. Since then, it has been performed at the New Zealand Fringe
          Festival (2020 & 2021), the Auckland Improv Festival (2023), the Big
          Fork Comedy Festival (Brisbane, 2023), and the ITS Comedy Festival
          (Sydney, 2024).
        </p>
        <p className="flex gap-2 items-center">
          <AwardIcon className="size-6 sketchy" />
          <span>
            Nominated for Outstanding Solo Performance, 2021 New Zealand Fringe
            Festival
          </span>
        </p>
      </ShowBody>
    </>
  )
}
