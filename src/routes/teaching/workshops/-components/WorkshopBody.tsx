import type React from 'react'
import type { Workshop } from './types'

type WorkshopBodyProps = {
  workshop: Workshop
}

export const WorkshopBody = ({
  children,
}: React.PropsWithChildren<WorkshopBodyProps>) => {
  return <div className="prose md:prose-lg pb-20">{children}</div>
}
