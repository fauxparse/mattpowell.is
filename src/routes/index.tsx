import { createFileRoute, Link } from '@tanstack/react-router'
import { Portrait } from '@/components/Portrait.tsx'

import './-Home.css'
import { HomepageSection } from '@/components/HomepageSection.tsx'
import { useCallback, useRef } from 'react'
import { Footer } from '@/components/Footer.tsx'
import { SITE_DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import { Definition } from '@/components/Definition'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: SITE_NAME },
      {
        name: 'description',
        content: SITE_DEFAULT_DESCRIPTION,
      },
      { property: 'og:url', content: `${SITE_URL}/` },
      { property: 'og:title', content: SITE_NAME },
      {
        property: 'og:description',
        content: SITE_DEFAULT_DESCRIPTION,
      },
      { name: 'twitter:title', content: SITE_NAME },
      {
        name: 'twitter:description',
        content: SITE_DEFAULT_DESCRIPTION,
      },
    ],
  }),
})

function Home() {
  const cleanupProgrammaticScrollRef = useRef<(() => void) | null>(null)

  const nextSection = useCallback(() => {
    const allSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section]'),
    )
    if (allSections.length === 0) return

    const currentSectionIndex = allSections.reduce(
      (closestIndex, section, index) => {
        const closestSection = allSections[closestIndex]
        return Math.abs(section.getBoundingClientRect().top) <
          Math.abs(closestSection.getBoundingClientRect().top)
          ? index
          : closestIndex
      },
      0,
    )
    const nextSection = allSections[currentSectionIndex + 1]
    if (!nextSection) return

    cleanupProgrammaticScrollRef.current?.()

    const root = document.documentElement
    const targetTop = nextSection.getBoundingClientRect().top + window.scrollY
    let frameId: number | undefined
    let settleTimeoutId: number | undefined
    let fallbackTimeoutId: number | undefined

    const cleanup = () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId)
      if (settleTimeoutId !== undefined) window.clearTimeout(settleTimeoutId)
      if (fallbackTimeoutId !== undefined)
        window.clearTimeout(fallbackTimeoutId)
      window.removeEventListener('scrollend', cleanup)
      delete root.dataset.homeProgrammaticScroll
      if (cleanupProgrammaticScrollRef.current === cleanup) {
        cleanupProgrammaticScrollRef.current = null
      }
    }

    const cleanupAfterSettling = () => {
      if (Math.abs(window.scrollY - targetTop) <= 1) {
        settleTimeoutId = window.setTimeout(cleanup, 100)
        return
      }

      frameId = window.requestAnimationFrame(cleanupAfterSettling)
    }

    root.dataset.homeProgrammaticScroll = 'true'
    cleanupProgrammaticScrollRef.current = cleanup
    window.addEventListener('scrollend', cleanup, { once: true })
    window.scrollTo({ top: targetTop, behavior: 'smooth' })

    frameId = window.requestAnimationFrame(cleanupAfterSettling)
    fallbackTimeoutId = window.setTimeout(cleanup, 3000)
  }, [])

  return (
    <div className="home">
      <header className="bg-radial-[circle_at_50%_20%] from-background to-(--background-gradient-dark) from-60%">
        <Portrait className="max-w-lg" />
        <h1 className="text-uppercase [view-transition-name:title]">
          Matt Powell
        </h1>
      </header>
      <HomepageSection title="Creating">
        <HomepageSection.Paragraph>
          I’m a performer, artist, and developer based in{' '}
          <Definition label="Wellington">Te Whanganui-a-Tara</Definition>,{' '}
          <Definition label="New Zealand">Aotearoa</Definition>. While I do many
          different things, they’re underpinned by a commitment to curiosity,
          connection, and creativity.
        </HomepageSection.Paragraph>
        <HomepageSection.Note>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 762"
            className="h-6 w-auto sketchy inline-block mr-3 hover:boil"
          >
            <path fill="#6d2380" d="M0 0h1200v762H0V0Z" />
            <path fill="#2c58a4" d="M0 0h1200v635H0V0Z" />
            <path fill="#78b82a" d="M0 0h1200v508H0V0Z" />
            <path fill="#efe524" d="M0 0h1200v381H0V0Z" />
            <path fill="#f28917" d="M0 0h1200v254H0V0Z" />
            <path fill="#e22016" d="M0 0h1200v127H0V0Z" />
            <path d="M315 0H0v762h315l353-381L315 0z" />
            <path fill="#945516" d="M241 0H0v762h241l353-381L241 0z" />
            <path fill="#7bcce5" d="M168 0H0v762h168l353-381L168 0z" />
            <path fill="#f4aec8" d="M95 0H0v762h95l353-381L95 0z" />
            <path fill="#fff" d="M0 0v762h22l352-381L22 0H0z" />
            <path fill="#fdd817" d="m0 706 301-325L0 55v651z" />
            <circle
              cx="111"
              cy="381"
              r="80"
              fill="none"
              stroke="#66338b"
              strokeWidth="19"
            />
          </svg>
          I’m queer and autistic and I have{' '}
          <Definition label="Attention Deficit Hyperactivity Disorder">
            ADHD
          </Definition>
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
        <HomepageSection.Buttons>
          <Link
            className="px-4 py-2 bg-accent-500 text-accent-50 rounded-lg text-2xl font-bold sketchy hover:boil"
            to="/teaching"
          >
            My workshops
          </Link>
        </HomepageSection.Buttons>
      </HomepageSection>
      <HomepageSection title="Writing">
        <HomepageSection.Paragraph>
          I’ve written and directed a bunch of short plays for children.
        </HomepageSection.Paragraph>
        <HomepageSection.Buttons>
          <Link
            className="px-4 py-2 bg-accent-500 text-accent-50 rounded-lg text-2xl font-bold sketchy hover:boil"
            to="/writing"
          >
            My scripts
          </Link>
        </HomepageSection.Buttons>
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
            className="lg:absolute lg:top-[7%] lg:left-[60%] lg:sticker lg:rotate-5"
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
