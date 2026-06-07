import { kebabCase } from 'es-toolkit'
import { Portrait } from './Portrait'
import { Link } from '@tanstack/react-router'
import { CornerUpLeftIcon } from 'lucide-react'

type SectionPageProps = {
  title: string
}

export const SectionPage = ({
  title,
  children,
}: React.PropsWithChildren<SectionPageProps>) => {
  const id = kebabCase(title)
  return (
    <div className="mx-auto w-full max-w-5xl px-4 flex flex-col min-h-svh">
      <header className="py-4 border-b border-border pl-10 relative flex items-center justify-between">
        <Portrait
          headOnly
          className="max-w-28 absolute left-0 top-1/2 pointer-events-none w-auto h-auto translate-x-[-37%] translate-y-[-22%]"
        />
        <h1 className="text-xl md:text-2xl font-bold">
          <span className="[view-transition-name:title]">Matt Powell is</span>{' '}
          <span className="text-accent-500" style={{ viewTransitionName: id }}>
            {title}
          </span>
        </h1>
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <CornerUpLeftIcon className="size-4 sketchy" />
            Back
          </Link>
        </div>
      </header>
      <main className="grow">{children}</main>
      <footer className="py-4 border-t border-border pt-4 text-muted-foreground text-sm">
        <Link to="/me" className="hover:text-foreground">
          Media kit
        </Link>
      </footer>
    </div>
  )
}
