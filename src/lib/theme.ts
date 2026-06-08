export type Theme = 'light' | 'dark'

export const SCHEMES = ['slate', 'stone', 'olive'] as const
export type Scheme = (typeof SCHEMES)[number]

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

export function getResolvedScheme(): Scheme {
  const stored = localStorage.getItem('color-scheme')
  if (SCHEMES.includes(stored as Scheme)) return stored as Scheme
  return 'slate'
}

export function applyScheme(scheme: Scheme) {
  document.documentElement.setAttribute('data-color-scheme', scheme)
  localStorage.setItem('color-scheme', scheme)
}

export function applyThemeAndScheme(theme: Theme, scheme: Scheme) {
  applyTheme(theme)
  applyScheme(scheme)
}

export function toggleTheme(): Theme {
  const next = getResolvedTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
