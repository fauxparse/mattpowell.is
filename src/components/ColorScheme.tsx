import { useEffect } from 'react'

const SCHEMES = ['stone', 'slate', 'olive'] as const

type Scheme = (typeof SCHEMES)[number]

export function ColorScheme({ scheme }: { scheme: Scheme }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', scheme)
  }, [scheme])

  return null
}
