import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const switchVariants = cva(
  'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-disabled:cursor-not-allowed data-disabled:opacity-50 sketchy bg-input data-checked:bg-primary',
  {
    variants: {
      size: {
        default: 'h-6 w-10',
        sm: 'h-4 w-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-muted-foreground ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 group-data-checked/switch:bg-primary-foreground',
  {
    variants: {
      size: {
        default: 'size-5 data-checked:translate-x-[calc(100%-2px)]',
        sm: 'size-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(switchVariants({ size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={thumbVariants({ size })}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
