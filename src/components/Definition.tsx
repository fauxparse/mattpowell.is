import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type DefinitionProps = {
  label: string
  className?: string
  children: React.ReactNode
}

export const Definition = ({ label, className, children }: DefinitionProps) => {
  return (
    <Popover>
      <PopoverTrigger openOnHover className="inline cursor-help">
        <dfn aria-label={label} className={cn('whitespace-nowrap', className)}>
          {children}
        </dfn>
      </PopoverTrigger>
      <PopoverContent className="panel-inverse w-fit min-w-0 border-0 ring-0 bg-transparent text-lg text-balance text-center before:bg-tooltip-background before:opacity-95 drop-shadow-lg">
        {label}
      </PopoverContent>
    </Popover>
  )
}
