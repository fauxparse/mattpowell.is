import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './ui/button'

type CopyButtonProps = ButtonProps & {
  value: string
}

export const CopyButton = ({
  className,
  value,
  children = <span>Copy to clipboard</span>,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      className={cn('flex items-center gap-2', className)}
      onClick={copyToClipboard}
      {...props}
    >
      {copied ? (
        <>
          <CheckIcon className="size-4 sketchy" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <ClipboardIcon className="size-4 sketchy" />
          {children}
        </>
      )}
    </Button>
  )
}
