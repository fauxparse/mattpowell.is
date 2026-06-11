import { cn } from '@/lib/utils/index.ts'
import { useReducedMotion } from '@/lib/utils/useReducedMotion'
import type { ViewTransitionDocument } from '@/types/ViewTransitionDocument'
import { cva, type VariantProps } from 'class-variance-authority'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { flushSync } from 'react-dom'

export const TAG_COLORS = [
  'red',
  'teal',
  'purple',
  'amber',
  'sky',
  'pink',
  'lime',
  'indigo',
  'neutral',
] as const

export type TagColor = (typeof TAG_COLORS)[number]

const TagVariants = cva('panel rounded-sm px-2 py-0 text-sm text-foreground', {
  variants: {
    variant: {
      default: 'before:opacity-25',
      outline:
        'before:border before:border-(--color-panel-background) before:bg-transparent before:opacity-50',
    },
  },
})

type TagProps = {
  className?: string
  color?: TagColor
  children: React.ReactNode
  onClick?: () => void
}

export const Tag = ({
  className,
  color = 'neutral',
  variant = 'default',
  children,
  onClick,
}: VariantProps<typeof TagVariants> & TagProps) => {
  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      className={cn(
        TagVariants({ variant, className }),
        className,
        onClick && 'cursor-pointer',
      )}
      style={
        {
          '--color-panel-background': `var(--tag-${color})`,
        } as React.CSSProperties
      }
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Component>
  )
}

type TagAction =
  | {
      type: 'select' | 'deselect' | 'toggle'
      tag: string
    }
  | {
      type: 'clear'
    }

type TagsContext = {
  tags: string[]
  tagColors: Record<string, TagColor>
  selected: Set<string>
  select: (tag: string) => void
  deselect: (tag: string) => void
  toggle: (tag: string) => void
  clear: () => void
}

const TagsContext = createContext<TagsContext>({
  tags: [],
  tagColors: {},
  selected: new Set(),
  select: () => {},
  deselect: () => {},
  toggle: () => {},
  clear: () => {},
})

export const TagsProvider = ({
  tags,
  children,
}: React.PropsWithChildren<{ tags: string[] }>) => {
  const tagColors = useMemo(
    () =>
      tags.reduce(
        (acc, tag, index) => {
          acc[tag] = TAG_COLORS[index % TAG_COLORS.length]
          return acc
        },
        {} as Record<string, TagColor>,
      ),
    [tags],
  )

  const [selected, dispatch] = useReducer(
    (tags: Set<string>, action: TagAction) => {
      const newTags = new Set(tags)
      switch (action.type) {
        case 'select':
          newTags.add(action.tag)
          break
        case 'deselect':
          newTags.delete(action.tag)
          break
        case 'toggle':
          if (newTags.has(action.tag)) {
            newTags.delete(action.tag)
          } else {
            newTags.add(action.tag)
          }
          break
        case 'clear':
          newTags.clear()
      }
      return newTags
    },
    new Set<string>(),
  )

  const prefersReducedMotion = useReducedMotion()

  const change = useCallback(
    (action: TagAction) => {
      const viewTransitionDocument = document as ViewTransitionDocument
      if (viewTransitionDocument.startViewTransition && !prefersReducedMotion) {
        viewTransitionDocument.startViewTransition(() => {
          flushSync(() => {
            dispatch(action)
          })
        })
      } else {
        dispatch(action)
      }
    },
    [prefersReducedMotion],
  )

  const select = useCallback(
    (tag: string) => change({ type: 'select', tag }),
    [change],
  )
  const deselect = useCallback(
    (tag: string) => change({ type: 'deselect', tag }),
    [change],
  )
  const toggle = useCallback(
    (tag: string) => change({ type: 'toggle', tag }),
    [change],
  )
  const clear = useCallback(() => change({ type: 'clear' }), [change])

  return (
    <TagsContext.Provider
      value={{ tags, tagColors, selected, select, deselect, toggle, clear }}
    >
      {children}
    </TagsContext.Provider>
  )
}

export const useTags = () => useContext(TagsContext)
