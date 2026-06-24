import { type ClassValue, clsx } from 'clsx'
import { isString } from 'es-toolkit'
import { isArray } from 'es-toolkit/compat'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['hero', 'hero-note', 'h1'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseSearchTags(tags: unknown) {
  const parsedTags = isArray(tags)
    ? tags
    : isString(tags)
      ? tags.split(',')
      : []

  return parsedTags.filter(isString).filter(Boolean)
}

export function ignoreSkippedViewTransition(error: unknown) {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return
  }

  throw error
}
