import { PullChain } from './PullChain'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <PullChain
      className="hidden z-400 xl:block"
      position="-10%"
      color="var(--color-muted-foreground)"
      checked={theme === 'dark'}
      onCheckedChange={toggleTheme}
    />
  )
}
