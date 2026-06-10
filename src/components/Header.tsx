import { kebabCase } from 'es-toolkit'
import { Portrait } from './Portrait'
import { Link } from '@tanstack/react-router'
import { CornerUpLeftIcon } from 'lucide-react'

type HeaderProps = {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  const id = kebabCase(title)

  return (
    <header className="py-4 rule-after pl-10 relative flex items-center justify-between">
      <Portrait
        headOnly
        className="max-w-28 absolute left-0 top-1/2 pointer-events-none w-auto h-auto translate-x-[-37%] translate-y-[-22%]"
      />
      <h1 className="text-xl md:text-2xl font-bold">
        <Link to="/" className="[view-transition-name:title]">
          Matt Powell is
        </Link>{' '}
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
  )
}
