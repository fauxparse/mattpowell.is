import { cn } from '@/lib/utils/index.ts'
import { cva, type VariantProps } from 'class-variance-authority'
import { useCallback, useReducer } from 'react'

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

export const useTags = () => {
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

  const select = useCallback(
    (tag: string) => dispatch({ type: 'select', tag }),
    [],
  )
  const deselect = useCallback(
    (tag: string) => dispatch({ type: 'deselect', tag }),
    [],
  )
  const toggle = useCallback(
    (tag: string) => dispatch({ type: 'toggle', tag }),
    [],
  )
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  return {
    selected,
    select,
    deselect,
    toggle,
    clear,
  }
}
