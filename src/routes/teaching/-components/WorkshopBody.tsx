import type React from 'react'
import type { Workshop } from './types'

type WorkshopBodyProps = {
  workshop: Workshop
}

export const WorkshopBody = ({
  children,
}: React.PropsWithChildren<WorkshopBodyProps>) => {
  return <div className="prose md:prose-lg lg:prose-xl pb-20">{children}</div>
}
