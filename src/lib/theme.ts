export const THEMES = ['light', 'dark'] as const
export type Theme = (typeof THEMES)[number]

export const SCHEMES = ['slate', 'stone', 'olive'] as const
export type Scheme = (typeof SCHEMES)[number]

type ThemeChangeOptions = {
  transition?: boolean
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    finished: Promise<void>
  }
}

function prefersReducedMotion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}

function applyWithThemeTransition(
  update: () => void,
  { transition = true }: ThemeChangeOptions = {},
) {
  const viewTransitionDocument = document as ViewTransitionDocument

  if (
    !transition ||
    prefersReducedMotion() ||
    !viewTransitionDocument.startViewTransition
  ) {
    update()
    return
  }

  const root = document.documentElement
  root.classList.add('theme-view-transition')

  try {
    const viewTransition = viewTransitionDocument.startViewTransition(update)
    void viewTransition.finished.finally(() => {
      root.classList.remove('theme-view-transition')
    })
  } catch (error) {
    root.classList.remove('theme-view-transition')
    throw error
  }
}

export function getResolvedTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme, options?: ThemeChangeOptions) {
  applyWithThemeTransition(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, options)
}

export function getResolvedScheme(): Scheme {
  const stored = localStorage.getItem('color-scheme')
  if (SCHEMES.includes(stored as Scheme)) return stored as Scheme
  return 'slate'
}

export function applyScheme(scheme: Scheme, options?: ThemeChangeOptions) {
  applyWithThemeTransition(() => {
    document.documentElement.setAttribute('data-color-scheme', scheme)
    localStorage.setItem('color-scheme', scheme)
  }, options)
}

export function applyThemeAndScheme(
  theme: Theme,
  scheme: Scheme,
  options?: ThemeChangeOptions,
) {
  applyWithThemeTransition(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.setAttribute('data-color-scheme', scheme)
    localStorage.setItem('theme', theme)
    localStorage.setItem('color-scheme', scheme)
  }, options)
}

export function toggleTheme(): Theme {
  const next = getResolvedTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
