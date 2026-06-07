import { cn } from '@/lib/utils'

type BaseProps = {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  className?: string
  loading?: React.ComponentProps<'img'>['loading']
  decoding?: React.ComponentProps<'img'>['decoding']
  onImageLoad?: React.ComponentProps<'img'>['onLoad']
  orientation?: 'landscape' | 'portrait'
}

type MaskedImageProps = React.ComponentProps<'div'> & BaseProps

export const MaskedImage = ({
  src,
  srcSet,
  sizes,
  alt,
  className,
  loading,
  decoding,
  onImageLoad,
  orientation = 'landscape',
  ...props
}: MaskedImageProps) => {
  const maskWidth = orientation === 'landscape' ? 800 : 600
  const maskHeight = orientation === 'landscape' ? 600 : 800

  return (
    <div className={cn('relative min-w-0', className)} {...props}>
      <img
        className="size-full object-cover absolute inset-0 scale-110"
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={onImageLoad}
        style={{
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${maskWidth} ${maskHeight}'%3E%3Cdefs%3E%3Cfilter id='sketchy'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.03' numOctaves='2' seed='1' result='noise' /%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='5' xChannelSelector='R' yChannelSelector='G' /%3E%3C/filter%3E%3C/defs%3E%3Crect x='0' y='0' width='${maskWidth}' rx='16' height='${maskHeight}' fill='black' transform='scale(0.9)' transform-origin='center' filter='url(%23sketchy)' /%3E%3C/svg%3E")`,
          maskSize: '100%',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
        }}
      />
    </div>
  )
}
