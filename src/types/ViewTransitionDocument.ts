export type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    finished: Promise<void>
  }
}
