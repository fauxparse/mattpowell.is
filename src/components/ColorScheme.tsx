import { useEffect } from 'react'
import {
  getResolvedScheme,
  applyScheme,
  type Scheme,
  SCHEMES,
} from '../lib/theme'

export function ColorScheme({ scheme }: { scheme?: Scheme }) {
  useEffect(() => {
    const resolved = scheme ?? getResolvedScheme()
    // ensure the attribute and storage are set on mount and when scheme changes
    applyScheme(resolved)
  }, [scheme])

  return null
}

export { SCHEMES as COLOR_SCHEMES }
