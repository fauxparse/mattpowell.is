// oxlint-disable jsx-a11y/click-events-have-key-events jsx-a11y/prefer-tag-over-role jsx-a11y/no-static-element-interactions
import { useCallback, useEffect, useReducer, useState } from 'react'
import { flushSync } from 'react-dom'
import { MaskedImage } from './MaskedImage'
import { cn } from '@/lib/utils'
import { CameraIcon, DownloadIcon, XIcon } from 'lucide-react'
import { Button } from './ui/button'
import { CopyButton } from './CopyButton'

type ImageSource = {
  src: string
  width: number
}

export type ImageData = {
  name: string
  src: string
  display: ImageSource[]
  alt: string
  credit: string
  x: number
  y: number
  z: number
  width: number
  height: number
  rotate: number
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>
  }
}

type ImageCardProps = {
  image: ImageData
  open: boolean
  selected: boolean
  onOpenChange: (open: boolean) => void
  onSelect: () => void
  onDeselect: () => void
}

const toSrcSet = (sources: ImageSource[]) =>
  sources.map(({ src, width }) => `${src} ${width}w`).join(', ')

const imageSrc = (image: ImageData) =>
  image.display[image.display.length - 1]?.src ?? image.src

const previewSrc = (image: ImageData) => image.display[0]?.src ?? image.src

export const ImageCard = ({
  image,
  open,
  selected,
  onOpenChange,
  onSelect,
  onDeselect,
}: ImageCardProps) => {
  const orientation = image.width > image.height ? 'landscape' : 'portrait'
  const viewTransitionName = 'selected-image-card'
  const [fullImageLoaded, setFullImageLoaded] = useState(false)
  const srcSet = toSrcSet(image.display)
  const fullSize =
    orientation === 'landscape'
      ? 'min(80vw, 100vh)'
      : 'calc(min(80vh, 100vw) * 0.75)'
  const thumbnailSize =
    orientation === 'landscape'
      ? '(min-width: 1024px) 347px, calc((100vw - 2rem) * 0.35)'
      : '(min-width: 1024px) 260px, calc((100vw - 2rem) * 0.2625)'
  const openImageClassName = cn(
    'relative overflow-hidden',
    orientation === 'landscape'
      ? 'w-[min(80vw,100vh)] aspect-4/3'
      : 'h-[min(80vh,100vw)] aspect-3/4',
  )

  const setOpenWithTransition = useCallback(
    (nextOpen: boolean) => {
      const viewTransitionDocument = document as ViewTransitionDocument

      if (
        !viewTransitionDocument.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        onOpenChange(nextOpen)
        if (!nextOpen) {
          onDeselect()
        }
        return
      }

      const transition = viewTransitionDocument.startViewTransition(() => {
        flushSync(() => {
          onOpenChange(nextOpen)
        })
      })

      if (!nextOpen) {
        transition.finished.finally(onDeselect)
      }
    },
    [onDeselect, onOpenChange],
  )

  const showImage = () => {
    flushSync(() => {
      onSelect()
    })
    setOpenWithTransition(true)
  }
  const hideImage = useCallback(
    () => setOpenWithTransition(false),
    [setOpenWithTransition],
  )

  useEffect(() => {
    if (!open) return

    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideImage()
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener('keydown', close)

    return () => {
      window.removeEventListener('keydown', close)
    }
  }, [open, hideImage])

  useEffect(() => {
    if (!open) {
      setFullImageLoaded(false)
    }
  }, [open])

  if (open) {
    return (
      <div
        aria-label={`Close ${image.alt}`}
        className="fixed inset-0 z-510 flex items-center justify-center border-0 p-0"
        onClick={hideImage}
      >
        <div
          className="panel before:shadow-xl before:bg-neutral-50 before:border before:border-border before:rounded-2xl"
          style={{ viewTransitionName: selected ? viewTransitionName : 'none' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={openImageClassName}>
            <MaskedImage
              src={previewSrc(image)}
              alt=""
              orientation={orientation}
              className="absolute inset-0 size-full"
            />
            <MaskedImage
              src={imageSrc(image)}
              srcSet={srcSet}
              sizes={fullSize}
              alt={image.alt}
              orientation={orientation}
              decoding="async"
              onImageLoad={() => setFullImageLoaded(true)}
              className={cn(
                'absolute inset-0 size-full transition-opacity duration-300 ease-out',
                fullImageLoaded ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
          <div className="absolute bottom-8 left-8 right-8 p-4 z-1 panel before:bg-neutral-100/80 text-neutral-800 text-md grid md:grid-cols-[1fr_auto] gap-4 md:gap-8">
            <p className="m-0 md:text-lg">{image.alt}</p>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <CameraIcon className="size-4 sketchy" />
                {image.credit}
              </p>
              <a
                className="flex items-center gap-2 active:translate-y-px"
                href={image.src}
                download
              >
                <DownloadIcon className="size-4 sketchy" />
                {`Download ${image.width} × ${image.height}`}
              </a>
              <CopyButton
                variant="inline"
                className="text-neutral-800 h-auto w-fit p-0"
                value={`${image.alt} [Photo credit: ${image.credit}]`}
              >
                Copy alt text
              </CopyButton>
            </div>
          </div>

          <Button
            className={cn(
              'absolute z-10 rounded-full before:bg-neutral-100/75 text-neutral-800',
              orientation === 'landscape'
                ? 'right-0 -top-12'
                : '-right-12 top-0',
            )}
            onClick={hideImage}
          >
            <XIcon className="size-4 sketchy" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="absolute p-[1cqw] rounded-[2cqw] panel before:bg-neutral-50 before:shadow-xl before:border before:border-border cursor-pointer"
      style={{
        left: `${image.x}cqw`,
        top: `${image.y}cqw`,
        zIndex: selected ? 510 : image.z,
        rotate: `${image.rotate}deg`,
        viewTransitionName: selected ? viewTransitionName : 'none',
      }}
      onClick={showImage}
      role="button"
      tabIndex={0}
    >
      <MaskedImage
        orientation={orientation}
        className={cn(
          orientation === 'landscape'
            ? 'w-[35cqw] aspect-4/3'
            : 'h-[35cqw] aspect-3/4',
        )}
        src={imageSrc(image)}
        srcSet={srcSet}
        sizes={thumbnailSize}
        alt={image.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

type CardsAction = {
  type: 'select' | 'open' | 'close' | 'deselect'
  name: string
}

type CardsState = {
  images: ImageData[]
  selected: string | null
  backdropVisible: boolean
  open: string | null
}

export const ImageCards = ({ images: initial }: { images: ImageData[] }) => {
  const [{ images, selected, backdropVisible, open }, dispatch] = useReducer(
    (state: CardsState, action: CardsAction) => {
      if (action.type === 'select') {
        const current = state.images.find((image) => image.name === action.name)
        if (!current) {
          return state
        }

        return {
          ...state,
          selected: action.name,
          backdropVisible: false,
          images: [
            ...state.images.filter((image) => image.name !== action.name),
            current,
          ].map((image, i) => ({
            ...image,
            z: i + 10,
          })),
        }
      } else if (action.type === 'open') {
        return { ...state, backdropVisible: true, open: action.name }
      } else if (action.type === 'deselect') {
        return { ...state, selected: null, backdropVisible: false }
      } else {
        return { ...state, backdropVisible: false, open: null }
      }
    },
    { images: initial, selected: null, backdropVisible: false, open: null },
  )

  const onOpenChange = (name: string, open: boolean) => {
    dispatch({ type: open ? 'open' : 'close', name })
  }

  const onSelect = (name: string) => {
    dispatch({ type: 'select', name })
  }

  const onDeselect = (name: string) => {
    dispatch({ type: 'deselect', name })
  }

  return (
    <div className="relative aspect-video @container">
      {selected ? (
        <div
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-500 bg-black/50 transition-opacity duration-200 ease-out',
            backdropVisible ? 'opacity-100' : 'opacity-0',
          )}
          style={{ viewTransitionName: 'image-card-backdrop' }}
        />
      ) : null}
      {images.map((image) => (
        <ImageCard
          key={image.src}
          image={image}
          open={open === image.name}
          selected={selected === image.name}
          onOpenChange={(open) => onOpenChange(image.name, open)}
          onSelect={() => onSelect(image.name)}
          onDeselect={() => onDeselect(image.name)}
        />
      ))}
    </div>
  )
}
