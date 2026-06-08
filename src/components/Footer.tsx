import { Link } from '@tanstack/react-router'
import { ThemeSelector } from './ThemeProvider'
import { cn } from '@/lib/utils'
import { CameraIcon, SpeechIcon } from 'lucide-react'

export const Footer = ({ className }: { className?: string }) => (
  <footer
    className={cn(
      'flex justify-between items-center py-4 border-t border-border pt-4 text-muted-foreground text-sm',
      className,
    )}
  >
    <div className="flex items-center gap-4">
      <Link
        to="/"
        hash="#available"
        className="flex items-center gap-2 hover:text-foreground"
      >
        <SpeechIcon className="size-6 sketchy" />
        Get in touch
      </Link>
      <Link to="/me" className="flex items-center gap-2 hover:text-foreground">
        <CameraIcon className="size-6 sketchy" />
        Media kit
      </Link>
    </div>
    <div>
      <ThemeSelector />
    </div>
  </footer>
)
