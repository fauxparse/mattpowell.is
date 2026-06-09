import { SectionPage } from '@/components/SectionPage.tsx'
import { Bio } from './-Bio'
import { ImageCards, type ImageData } from '@/components/ImageCard.tsx'

const Images: ImageData[] = [
  {
    name: 'portrait',
    src: '/photos/matt-powell-dark-576x864.jpg',
    display: [
      { src: '/photos/matt-powell-dark-320w.jpg', width: 320 },
      { src: '/photos/matt-powell-dark-512w.jpg', width: 512 },
    ],
    alt: 'Portrait headshot of Matt Powell',
    credit: 'Damon Smith (2017)',
    x: 0,
    y: 7,
    z: 6,
    width: 576,
    height: 864,
    rotate: -5,
  },
  {
    name: 'landscape',
    src: '/photos/matt-powell-dark-1296x864.jpg',
    display: [
      { src: '/photos/matt-powell-dark-landscape-320w.jpg', width: 320 },
      { src: '/photos/matt-powell-dark-landscape-640w.jpg', width: 640 },
      { src: '/photos/matt-powell-dark-landscape-960w.jpg', width: 960 },
      { src: '/photos/matt-powell-dark-landscape-1280w.jpg', width: 1280 },
    ],
    alt: 'Landscape headshot of Matt Powell',
    credit: 'Damon Smith (2017)',
    x: 19,
    y: 26,
    z: 7,
    width: 1296,
    height: 864,
    rotate: 2,
  },
  {
    name: 'colourful',
    src: '/photos/matt-powell-colourful-1024x1366.jpg',
    display: [
      { src: '/photos/matt-powell-colourful-320w.jpg', width: 320 },
      { src: '/photos/matt-powell-colourful-640w.jpg', width: 640 },
      { src: '/photos/matt-powell-colourful-768w.jpg', width: 768 },
    ],
    alt: 'Colourful candid shot of Matt Powell on a sofa in Lumen Bar at BATS in Wellington',
    credit: 'Andrea Ferpo (2024)',
    x: 43,
    y: 1,
    z: 8,
    width: 1024,
    height: 1366,
    rotate: -1,
  },
  {
    name: 'stage',
    src: '/photos/matt-powell-stage-1536x1024.jpg',
    display: [
      { src: '/photos/matt-powell-stage-320w.jpg', width: 320 },
      { src: '/photos/matt-powell-stage-640w.jpg', width: 640 },
      { src: '/photos/matt-powell-stage-960w.jpg', width: 960 },
      { src: '/photos/matt-powell-stage-1280w.jpg', width: 1280 },
    ],
    alt: 'Stage shot of Matt Powell performing at the New Zealand Improv Festival 2023',
    credit: 'Kirsty McGuire (2023)',
    x: 63,
    y: 20,
    z: 7,
    width: 1536,
    height: 1024,
    rotate: 8,
  },
] as const

export default function MePage() {
  return (
    <SectionPage title="A media kit">
      <div className="flex flex-col gap-4 py-4">
        <ImageCards images={Images} />
        <Bio />
      </div>
    </SectionPage>
  )
}
