import type { RegisteredRouter, RouteIds } from '@tanstack/react-router'
import { isObject } from 'es-toolkit/compat'

type WorkshopRoutePath = Extract<
  RouteIds<RegisteredRouter['routeTree']>,
  `/teaching/workshops/${string}`
>

type WorkshopId = WorkshopRoutePath extends `/teaching/workshops/${infer Id}`
  ? Id
  : never

export type Workshop = {
  id: WorkshopId
  title: string
  tags: string[]
  duration: number
  short: string
}

export const hasWorkshop = (module: any): module is { Workshop: Workshop } =>
  isObject(module) && 'Workshop' in module
