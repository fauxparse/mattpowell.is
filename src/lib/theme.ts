export type Theme = 'light' | 'dark'

export function getResolvedTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.classList.toggle('light', theme === 'light')
  localStorage.setItem('theme', theme)
}

export function toggleTheme(): Theme {
  const next = getResolvedTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
