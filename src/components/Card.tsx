import { cn } from '@/lib/utils'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Tag, useTags } from './ui/tag'
import type { CSSProperties } from 'react'

type CardProps = LinkProps & {
  className?: string
  tags?: string[]
  title: string
  short: string
  image?: string
}

export const Card = ({
  className,
  tags,
  title,
  short,
  image,
  ...props
}: CardProps) => {
  const { tagColors } = useTags()
  return (
    <Link
      className={cn(
        'flex flex-col gap-2 relative rounded-lg p-4 hover:after:boil after:absolute after:inset-0 after:border-[1.5px] after:border-border after:rounded-[inherit] after:sketchy',
        image &&
          'before:absolute before:inset-px before:rounded-[inherit] before:-z-1 before:translate-x-[2px] before:translate-y-[2px] before:bg-(image:--image-url) before:bg-cover before:bg-center before:opacity-10',
        className,
      )}
      style={
        image
          ? ({
              '--image-url': `url(${image})`,
            } as CSSProperties)
          : {}
      }
      {...props}
    >
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Tag key={tag} color={tagColors[tag]}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
      <div className="mt-auto">
        <h3 className="text-xl font-bold uppercase text-accent-500 text-balance">
          {title}
        </h3>
        <p>{short}</p>
      </div>
    </Link>
  )
}
