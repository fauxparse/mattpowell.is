import { cn } from '@/lib/utils'
import type { PropsWithChildren } from 'react'

type PullQuoteProps = {
  className?: string
  link?: string
  source?: string
}

export const PullQuote = ({
  className,
  link,
  source,
  children,
}: PropsWithChildren<PullQuoteProps>) => {
  return (
    <blockquote
      className={cn(
        'not-prose not-italic border-0 relative px-8 before:content-["“"] before:absolute before:top-0 before:-left-4 before:text-8xl before:text-accent-500 before:opacity-15 before:-z-1 before:font-bold',
        className,
      )}
    >
      <p className="text-accent-500 text-xl md:text-2xl leading-loose mb-0">
        {children}
      </p>
      {source && (
        <cite className="not-italic mt-2 small-caps text-muted-foreground">
          {link ? (
            <a
              href={link}
              className="link text-muted-foreground"
              rel="noopener noreferrer"
            >
              {source}
            </a>
          ) : (
            source
          )}
        </cite>
      )}
    </blockquote>
  )
}
