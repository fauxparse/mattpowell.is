import type { RegisteredRouter, RouteIds } from '@tanstack/react-router'
import { isObject } from 'es-toolkit/compat'

type ShowRoutePath = Extract<
  RouteIds<RegisteredRouter['routeTree']>,
  `/improvising/shows/${string}`
>

type ShowId = ShowRoutePath extends `/improvising/shows/${infer Id}`
  ? Id
  : never

export type Show = {
  id: ShowId
  title: string
  tags: string[]
  short: string
  image?: string
}

export const hasShow = (module: any): module is { Show: Show } =>
  isObject(module) && 'Show' in module
