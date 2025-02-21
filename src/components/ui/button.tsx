import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 disabled:not-allowed',

  variants: {
    variant: {
      primary:
        'bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500',
      secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900',
    },

    size: {
      default: 'px-4 py-2.5',
      icon: 'size-7',
      sm: 'px-3 py-1.5',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component {...props} className={button({ variant, size, className })} />
  )
}

Button.displayName = 'Button'
