import { useEffect, useState } from 'react'

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(
    matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    mql.addEventListener('change', listener)
    return () => {
      mql.removeEventListener('change', listener)
    }
  }, [])

  return reducedMotion
}
