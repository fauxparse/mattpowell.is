import { Tag } from '@/components/ui/tag'
import type { Workshop } from './types'
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'

type WorkshopHeaderProps = {
  workshop: Workshop
}
export const WorkshopHeader = ({ workshop }: WorkshopHeaderProps) => {
  const duration = useMemo(() => {
    const hours = workshop.duration / 60
    return `${hours === Math.floor(hours) ? hours : hours.toFixed(1)} hour${hours > 1 ? 's' : ''}`
  }, [workshop.duration])

  return (
    <div className="flex flex-col gap-2 py-4 mb-8 rule-after">
      <div className="flex gap-2 small-caps text-muted-foreground">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        &gt;
        <Link
          to="/teaching"
          className="text-muted-foreground hover:text-foreground"
        >
          Workshops
        </Link>
        &gt;
      </div>
      <h1 className="text-h1 font-bold text-accent-500 leading-[1.2] md:mt-16">
        {workshop.title}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground text-balance">
        {workshop.short}
      </p>
      <dl className="grid grid-cols-[auto_1fr] items-start mt-2 gap-x-4 gap-y-2 [&>dt]:text-muted-foreground [&>dt]:small-caps">
        <dt>Duration</dt>
        <dd>{duration}</dd>
        <dt>Tags</dt>
        <dd className="flex flex-wrap gap-2">
          {workshop.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </dd>
      </dl>
    </div>
  )
}
