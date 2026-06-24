import type React from 'react'
import type { Show } from './types'
import ContactForm from '@/components/ContactForm'

type ShowBodyProps = {
  show: Show
}

export const ShowBody = ({
  show,
  children,
}: React.PropsWithChildren<ShowBodyProps>) => {
  return (
    <>
      <div className="prose md:prose-lg lg:prose-xl pb-20">{children}</div>
      <ContactForm
        className="max-w-2xl"
        subject={`Show enquiry: ${show.title}`}
      />
    </>
  )
}
