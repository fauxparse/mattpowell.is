import type React from 'react'
import { kebabCase } from 'es-toolkit'

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
        {title}
      </h2>
      <div className="content relative text-balance text-hero text-center text-foreground line-height-2 flex flex-col items-center gap-2">
        {children}
      </div>
    </section>
  )
}

const Paragraph = ({ children }: React.PropsWithChildren) => {
  return <p className="max-w-[32em]">{children}</p>
}

const Note = ({ children }: React.PropsWithChildren) => {
  return (
    <p className="max-w-[32em] text-hero-note text-muted-foreground">
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
