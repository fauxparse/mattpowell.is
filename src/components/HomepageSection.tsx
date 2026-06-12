import type React from 'react'
import { kebabCase } from 'es-toolkit'
import { cn } from '@/lib/utils'

type HomepageSectionProps = {
  title: string
}

const Root = ({
  title,
  children,
}: React.PropsWithChildren<HomepageSectionProps>) => {
  const id = kebabCase(title)
  return (
    <section id={id} data-section={id}>
      <h2 className="boil" style={{ viewTransitionName: id }}>
        <span className="sr-only">Matt Powell is </span>
        {title}
      </h2>
      <div className="content relative text-balance text-hero text-center text-foreground line-height-2 flex flex-col items-center gap-2">
        {children}
      </div>
    </section>
  )
}

const Paragraph = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <p className={cn('max-w-[32em]', className)}>{children}</p>
}

const Note = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <p
      className={cn(
        'max-w-[32em] text-hero-note text-muted-foreground',
        className,
      )}
    >
      {children}
    </p>
  )
}

const Buttons = ({ children }: React.PropsWithChildren) => {
  return <div className="flex gap-4 p-2 justify-center">{children}</div>
}

export const HomepageSection = Object.assign(Root, {
  displayName: 'HomepageSection',
  Paragraph,
  Note,
  Buttons,
})
