import { createFileRoute, Link } from '@tanstack/react-router'
import { Portrait } from '@/components/Portrait.tsx'

import './-Home.css'
import { HomepageSection } from '@/components/HomepageSection.tsx'
import { useCallback } from 'react'
import { Footer } from '#/components/Footer.tsx'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'Matt Powell' },
      {
        name: 'description',
        content:
          'Matt Powell — performer, artist, and developer based in Wellington, Aotearoa New Zealand.',
      },
      { property: 'og:url', content: 'https://mattpowell.is/' },
      { property: 'og:title', content: 'Matt Powell' },
      {
        property: 'og:description',
        content:
          'Matt Powell — performer, artist, and developer based in Wellington, Aotearoa New Zealand.',
      },
      { name: 'twitter:title', content: 'Matt Powell' },
      {
        name: 'twitter:description',
        content:
          'Matt Powell — performer, artist, and developer based in Wellington, Aotearoa New Zealand.',
      },
    ],
  }),
})

function Home() {
  const nextSection = useCallback(() => {
    const allSections = Array.from(document.querySelectorAll('[data-section]'))
    const nextSectionIndex = allSections.findIndex((section) => {
      const { top, height } = section.getBoundingClientRect()
      return top + height / 2 > window.innerHeight
    })
    if (nextSectionIndex === -1) return

    const nextSection = allSections[nextSectionIndex]
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="home">
      <header className="bg-radial-[circle_at_50%_20%] from-background to-(--background-gradient-dark) from-60%">
        <div className="grid h-[calc(var(--vertical)-var(--big)*1.5)] items-start justify-center-safe pt-8">
          <Portrait className="max-w-lg" />
        </div>
        <h1 className="text-uppercase [view-transition-name:title]">
          Matt Powell
        </h1>
      </header>
      <HomepageSection title="Creating">
        <HomepageSection.Paragraph>
          I’m a performer, artist, and developer based in{' '}
          <abbr title="Wellington" className="whitespace-nowrap">
            Te Whanganui-a-Tara
          </abbr>
          ,{' '}
          <abbr title="New Zealand" className="whitespace-nowrap">
            Aotearoa
          </abbr>
          . While I do many different things, they’re underpinned by a
          commitment to curiosity, connection, and creativity.
        </HomepageSection.Paragraph>
        <HomepageSection.Note>
          I’m queer and autistic and I have{' '}
          <abbr
            title="Attention Deficit Hyperactivity Disorder"
            className="whitespace-nowrap"
          >
            ADHD
          </abbr>
          . My pronouns are{' '}
          <b className="font-normal text-foreground">he/him</b>.
        </HomepageSection.Note>
      </HomepageSection>
      <HomepageSection title="Improvising">
        <HomepageSection.Paragraph>
          I’ve been doing improv for 25+ years, in all kinds of formats and
          styles.
        </HomepageSection.Paragraph>
        <HomepageSection.Note>
          From 2023–2025 I was Artistic Co&#8209;Director of{' '}
          <a
            className="link"
            href="https://improvfest.nz"
            target="_blank"
            rel="noopener noreferrer"
          >
            the New Zealand Improv Festival
          </a>
          .
        </HomepageSection.Note>
        <HomepageSection.Buttons>
          <Link
            className="px-4 py-2 bg-accent-500 text-accent-50 rounded-lg text-2xl font-bold sketchy hover:boil"
            to="/improvising"
          >
            My shows
          </Link>
        </HomepageSection.Buttons>
      </HomepageSection>
      <HomepageSection title="Teaching">
        <HomepageSection.Paragraph>
          I’ve taught improv at festivals all around Aotearoa and Australia, and
          as far away as La&nbsp;Réunion and Peru.
        </HomepageSection.Paragraph>
        <HomepageSection.Note>
          Here you can find some of the many workshops I’m available to teach.
        </HomepageSection.Note>
      </HomepageSection>
      <HomepageSection title="Writing">
        <HomepageSection.Paragraph>
          I’ve written and directed a bunch of short plays for children.
        </HomepageSection.Paragraph>
      </HomepageSection>
      <HomepageSection title="Building">
        <HomepageSection.Paragraph>
          I've been building websites and applications since the late 1990s.
          Currently I'm working as a Senior Software Engineer at{' '}
          <a
            className="link"
            href="https://lyssna.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lyssna
          </a>
          .
        </HomepageSection.Paragraph>
        <HomepageSection.Note>
          Right now I’m working on a system called{' '}
          <b className="font-normal text-link">Presence</b> for managing
          interactive theatre experiences.
        </HomepageSection.Note>
        <HomepageSection.Note>(I also made this website.)</HomepageSection.Note>
      </HomepageSection>
      <HomepageSection title="Available">
        <dl className="text-hero grid grid-cols-[auto_1fr] w-max mx-auto gap-4 mb-4 text-left [&>dt]:text-right [&>dt]:text-muted-foreground [&>dt]:small-caps">
          <dt>Email</dt>
          <dd>
            <a
              className="link"
              href="mailto:whoever@mattpowell.is"
              target="_blank"
              rel="noopener noreferrer"
            >
              whoever@mattpowell.is
            </a>
          </dd>
          <dt>Instagram</dt>
          <dd>
            <a
              className="link"
              href="https://instagram.com/fauxparse"
              target="_blank"
              rel="noopener noreferrer"
            >
              @fauxparse
            </a>
          </dd>
          <dt>Bluesky</dt>
          <dd>
            <a
              className="link"
              href="https://bsky.app/fauxpar.se"
              target="_blank"
              rel="noopener noreferrer"
            >
              @fauxpar.se
            </a>
          </dd>
          <dt>LinkedIn</dt>
          <dd>
            <a
              className="link"
              href="https://linkedin.com/in/fauxparse"
              target="_blank"
              rel="noopener noreferrer"
            >
              @fauxparse
            </a>
          </dd>
        </dl>
        <HomepageSection.Note>
          <Link
            to="/me"
            className="lg:absolute lg:top-[15%] lg:left-[60%] lg:sticker lg:rotate-5"
          >
            <b></b>
            <span>
              Need a bio or photos? Check out my{' '}
              <span className="link cursor-pointer lg:text-inherit lg:no-underline lg:hover:filter-none">
                media kit
              </span>
              !
            </span>
          </Link>
        </HomepageSection.Note>
      </HomepageSection>
      <div
        className="fixed bottom-4 left-1/2 size-10 -translate-1/2 z-100"
        data-scroll-indicator="down"
      >
        <button
          className="size-10 grid place-content-center animate-[float_1s_ease-in-out_infinite_alternate] drop-shadow-lg z-200 pointer-events-auto"
          aria-label="Scroll down"
          onClick={nextSection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="size-10 background-transparent boil"
          >
            <path
              d="M47.489 26.042q0-5.424-1.835-10.09t-5.065-8.056-7.657-5.305Q28.504.677 23.4.677q-2.633 0-4.826.319-2.194.319-4.028 1.037a15.3 15.3 0 0 0-3.51 1.954q-1.675 1.236-3.35 3.071-2.392 2.553-3.789 4.826-1.396 2.273-2.114 4.028-.878 2.074-1.196 3.749l.478 7.578q.32 4.546 2.034 8.176 1.716 3.629 4.507 6.221 2.792 2.593 6.501 3.989t8.016 1.395q1.835 0 3.869-.757 2.034-.759 4.586-.758h3.43l2.234-1.356q.637-.16 2.473-.997 1.835-.838 3.788-2.832 1.955-1.994 3.47-5.424t1.516-8.854"
              className="fill-accent-500"
            />
            <path
              d="M24.022 34.571q.586 0 1.172-.391.585-.39 1.025-.879.44-.487.757-.927.316-.44.415-.586l.634-.635.879-2.197.635-1.074 1.952-4.491 2.051-3.32q.293-.537.488-1.098t.195-1.098q0-.733-.39-1.465-.342-.732-.757-.928-.415-.195-.708-.195h-.195l-1.025-.342-2.392 2.588-1.416 2.929-1.807 3.417-.585 1.416q-.294.733-.562 1.147t-.659.415q-.634 0-1.66-1.318l-.976-1.22-3.173-3.564-1.172-.781-1.367-2.002-2.099-.537-1.123.928-1.611.732 1.269 3.027 3.906 4.101 1.367 1.855.83.634 4.198 4.882q.44.489.879.732.44.245 1.025.245"
              className="fill-accent-100"
            />
          </svg>
        </button>
      </div>
      <div className="fixed right-0 bottom-0 left-0 @container">
        <Footer className="w-[calc(min(var(--container-5xl),100%)-2rem)] mx-auto" />
      </div>
    </div>
  )
}
