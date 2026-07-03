import { SectionPage } from '@/components/SectionPage'
import { SITE_URL } from '@/lib/site'
import { createFileRoute } from '@tanstack/react-router'
import { DownloadCloudIcon } from 'lucide-react'

export const Route = createFileRoute('/writing')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Matt Powell is writing' },
      {
        name: 'description',
        content:
          'Theatre scripts by Matt Powell — available for production by arrangement',
      },
      { property: 'og:url', content: `${SITE_URL}/writing` },
      { property: 'og:title', content: 'Matt Powell is writing' },
      {
        property: 'og:description',
        content:
          'Theatre scripts by Matt Powell — available for production by arrangement',
      },
      { name: 'twitter:title', content: 'Matt Powell is teaching' },
      {
        name: 'twitter:description',
        content:
          'Theatre scripts by Matt Powell — available for production by arrangement',
      },
    ],
  }),
})

function RouteComponent() {
  return (
    <SectionPage title="Writing">
      <h1 className="page-title">My scripts</h1>
      <p className="text-lg prose">
        I love writing short plays, especially for children. Many of my scripts
        have been produced by{' '}
        <a
          href="https://malthouse.co.nz/shows/"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Canterbury Children's Theatre
        </a>
        . I’ve put these scripts up so anyone can have a look through them: if
        you’d like to produce one of my plays, or if you’d like me to write for
        you or your group, please get in touch and we can work something out.
      </p>
      <div className="flex flex-col mt-6 gap-6">
        <ScriptSection
          id="cinderella"
          title="Cinderella"
          year={2011}
          summary={
            <>
              A spirited take on the original story. What if Cinderella didn't{' '}
              <b>want</b> to go to the ball?
            </>
          }
          info="7 actors / 45 minutes"
        />
        <ScriptSection
          id="slow-runnings"
          title="Slow Runnings: A tortoise and hare story"
          year={2013}
          summary={
            <>
              Can patience and determination overcome natural talent? And is
              winning really all that important?
            </>
          }
          info="3 actors / 45 minutes"
        />
        <ScriptSection
          id="space-mouse"
          title="Space Mouse/Underwater Mouse"
          year={2014}
          summary={
            <>
              A (mostly) silent, clown-adjacent play about how some things are
              different and some things are the same.
            </>
          }
          info="2 actors / 30 minutes"
        />
      </div>
    </SectionPage>
  )
}

type ScriptProps = {
  id: string
  title: string
  year: number
  summary: React.ReactNode
  info: string
}

const ScriptSection = ({ id, title, year, summary, info }: ScriptProps) => {
  return (
    <article id={id} className="rule py-4">
      <h2 className="text-2xl my-0">
        {title}{' '}
        <small className="text-2xl font-normal text-muted-foreground">
          ({year})
        </small>
      </h2>
      <div>
        <p className="my-2 max-w-2xl">{summary}</p>
        <p className="text-muted-foreground">{info}</p>
        <a
          href={`/scripts/${id}.pdf`}
          className="flex panel before:bg-accent-500 text-accent-50 px-4 pt-2 pb-1 w-fit gap-2 mt-2"
          download
        >
          <DownloadCloudIcon className="w-4 h-4 sketchy" />
          <span>Download script</span>
        </a>
      </div>
    </article>
  )
}
