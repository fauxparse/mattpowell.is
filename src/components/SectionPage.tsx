import { Footer } from './Footer'
import { Header } from './Header'

type SectionPageProps = {
  title: string
}

export const SectionPage = ({
  title,
  children,
}: React.PropsWithChildren<SectionPageProps>) => (
  <div className="mx-auto w-full max-w-5xl px-4 flex flex-col min-h-svh">
    <Header title={title} />
    <main className="grow">{children}</main>
    <Footer />
  </div>
)
