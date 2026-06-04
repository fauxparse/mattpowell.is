import { useEffect, useState } from 'react'

import { getResolvedTheme, toggleTheme, type Theme } from '../lib/theme'
import { PullChain } from './PullChain'
import { MoonIcon, SunIcon } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(getResolvedTheme())
  }, [])

  const Icon = theme === 'dark' ? SunIcon : MoonIcon

  return (
    <>
      <button
        type="button"
        className="fixed top-4 right-4 z-1000 pointer-events-auto md:hidden"
        onClick={() => setTheme(toggleTheme())}
      >
        <Icon className="w-4 h-4" />
      </button>
      <PullChain
        className="hidden z-1000 md:block"
        position="-10%"
        color="var(--color-muted-foreground)"
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(toggleTheme())}
      />
    </>
  )
}
