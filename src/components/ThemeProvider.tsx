import {
  type Theme,
  type Scheme,
  getResolvedTheme,
  applyTheme,
  applyScheme,
  applyThemeAndScheme,
  SCHEMES,
  THEMES,
  getResolvedScheme,
} from '@/lib/theme.ts'
import { upperFirst } from 'es-toolkit'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useReducedMotion } from '@/lib/utils/useReducedMotion'

const ThemeOptions = SCHEMES.flatMap((scheme) =>
  THEMES.map((theme) => ({
    label: `${upperFirst(scheme)} (${upperFirst(theme)})`,
    value: `${scheme}-${theme}`,
    data: { scheme, theme },
  })),
)

type ThemeContext = {
  theme: Theme
  colorScheme: Scheme
  setTheme: (theme: Theme) => void
  setColorScheme: (colorScheme: Scheme) => void
  setThemeAndColorScheme: (theme: Theme, colorScheme: Scheme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  colorScheme: 'slate',
  setTheme: () => {},
  setColorScheme: () => {},
  setThemeAndColorScheme: () => {},
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, _setTheme] = useState<Theme>(getResolvedTheme())
  const [colorScheme, _setColorScheme] = useState<Scheme>(getResolvedScheme())

  const reducedMotion = useReducedMotion()

  const setTheme = useCallback(
    (theme: Theme) => {
      _setTheme(theme)
      applyTheme(theme, { transition: !reducedMotion })
    },
    [reducedMotion],
  )

  const setColorScheme = useCallback(
    (colorScheme: Scheme) => {
      _setColorScheme(colorScheme)
      applyScheme(colorScheme, { transition: !reducedMotion })
    },
    [reducedMotion],
  )

  const setThemeAndColorScheme = useCallback(
    (theme: Theme, colorScheme: Scheme) => {
      _setTheme(theme)
      _setColorScheme(colorScheme)
      applyThemeAndScheme(theme, colorScheme, { transition: !reducedMotion })
    },
    [reducedMotion],
  )

  const toggleTheme = useCallback(() => {
    const current = getResolvedTheme()
    const next = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }, [setTheme])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          switch (mutation.attributeName) {
            case 'data-color-scheme':
              _setColorScheme(
                (mutation.target as HTMLElement).getAttribute(
                  'data-color-scheme',
                ) as Scheme,
              )
              break
            case 'class':
              _setTheme(
                document.documentElement.classList.contains('dark')
                  ? 'dark'
                  : 'light',
              )
              break
          }
        }
      }
    })
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        setTheme,
        setColorScheme,
        setThemeAndColorScheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export const ThemeSelector = () => {
  const { theme, colorScheme, setThemeAndColorScheme } = useTheme()

  const handleThemeChange = (value: string | null) => {
    if (!value) return
    const newTheme = ThemeOptions.find((option) => option.value === value)?.data
    if (!newTheme) return
    setThemeAndColorScheme(newTheme.theme, newTheme.scheme)
  }

  return (
    <Select
      items={ThemeOptions}
      value={`${colorScheme}-${theme}`}
      onValueChange={handleThemeChange}
    >
      <SelectTrigger chevron={false}>
        <SelectValue placeholder="Select a theme">
          <ThemeSwatch theme={theme} colorScheme={colorScheme} />
          <span className="hidden md:block">
            {`${upperFirst(colorScheme)} (${theme})`}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        side="top"
        align="end"
        className="w-44 px-1 py-2"
      >
        {THEMES.map((theme) => (
          <SelectGroup key={theme}>
            <SelectLabel>{upperFirst(theme)}</SelectLabel>
            {SCHEMES.map((scheme) => (
              <SelectItem
                key={scheme}
                value={`${scheme}-${theme}`}
                className="flex gap-2 items-center"
              >
                <ThemeSwatch theme={theme} colorScheme={scheme} />
                {`${upperFirst(scheme)}`}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

const ThemeSwatch = ({
  theme,
  colorScheme,
}: {
  theme: Theme
  colorScheme: Scheme
}) => {
  return (
    <span
      className="sketchy size-4 rounded-full border border-foreground -translate-y-px"
      style={{
        backgroundColor: `var(--color-${colorScheme}-${theme === 'light' ? '300' : '700'})`,
      }}
    />
  )
}
