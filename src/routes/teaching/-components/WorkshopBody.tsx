import type React from 'react'
import type { Workshop } from './types'
import ContactForm from '@/components/ContactForm'

type WorkshopBodyProps = {
  workshop: Workshop
}

export const WorkshopBody = ({
  workshop,
  children,
}: React.PropsWithChildren<WorkshopBodyProps>) => {
  return (
    <>
      <div className="prose md:prose-lg lg:prose-xl pb-20">{children}</div>
      <ContactForm
        className="max-w-2xl"
        subject={`Workshop enquiry: ${workshop.title}`}
      />
    </>
  )
}
