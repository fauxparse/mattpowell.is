import { Tag, useTags } from '@/components/ui/tag'
import type { Show } from './types'
import { Link } from '@tanstack/react-router'

type ShowHeaderProps = {
  show: Show
}
export const ShowHeader = ({ show }: ShowHeaderProps) => {
  const { tagColors } = useTags()

  return (
    <div className="flex flex-col gap-2 py-4 mb-8 rule-after">
      <div className="flex gap-2 small-caps text-muted-foreground">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        &gt;
        <Link
          to="/improvising"
          className="text-muted-foreground hover:text-foreground"
        >
          Shows
        </Link>
        &gt;
      </div>
      <h1 className="page-title">{show.title}</h1>
      <p className="text-lg md:text-xl text-muted-foreground text-balance">
        {show.short}
      </p>
      <dl className="grid grid-cols-[auto_1fr] items-start mt-2 gap-x-4 gap-y-2 [&>dt]:text-muted-foreground [&>dt]:small-caps">
        <dt>Tags</dt>
        <dd className="flex flex-wrap gap-2">
          {show.tags.map((tag) => (
            <Tag key={tag} color={tagColors[tag]}>
              {tag}
            </Tag>
          ))}
        </dd>
      </dl>
    </div>
  )
}
