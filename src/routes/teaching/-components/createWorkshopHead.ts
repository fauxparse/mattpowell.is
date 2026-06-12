import { SITE_NAME, SITE_URL } from '@/lib/site'
import type { Workshop } from './types'

const workshopTitleSuffix = `an improv workshop by ${SITE_NAME}`
const workshopDescriptionSuffix = `An improv workshop by ${SITE_NAME}.`

export function createWorkshopHead(workshop: Workshop) {
  const title = `${workshop.title}: ${workshopTitleSuffix}`
  const description = `${workshop.short}. ${workshopDescriptionSuffix}`
  const url = `${SITE_URL}/teaching/workshops/${workshop.id}`

  return {
    meta: [
      { title },
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:url',
        content: url,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
    ],
  }
}
