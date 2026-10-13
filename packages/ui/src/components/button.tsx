import type { VariantProps } from 'class-variance-authority'

import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  [
    'group/button ring-offset-background inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-clip-padding align-middle text-sm whitespace-nowrap antialiased transition-[colors] will-change-auto outline-none select-none',
    'aria-invalid:ring-destructive/20 aria-invalid:ring-2', // aria-*: styles
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', // disabled: styles
    'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:shadow-none focus-visible:ring-2', // focus-visible: styles
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", //[&_svg]: styles
  ],
  {
    defaultVariants: {
      animate: false,
      extrude: false,
      size: 'default',
      variant: 'default',
    },
    variants: {
      animate: {
        false: null,
        true: 'origin-bottom-right hover:not-disabled:-translate-px active:not-disabled:translate-px',
      },
      extrude: {
        false: null,
        true: 'shadow-extrude-base extrude-br data-animate:hover:not-disabled:shadow-extrude-lg data-animate:active:not-disabled:shadow-extrude-sm',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-lg': 'size-9',
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default:
          'bg-primary text-primary-foreground border-border dark:border-input/60 hover:bg-primary/80 shadow-primary border-t-border/60 border-l-border/60 dark:border-t-input dark:border-l-input',
        destructive:
          'bg-destructive/80 dark:bg-destructive/60 hover:bg-destructive dark:hover:bg-destructive/70 text-destructive-foreground focus-visible:ring-destructive border-destructive/60 dark:border-destructive/80 border-t-destructive/40 dark:border-t-destructive border-l-destructive/40 dark:border-l-destructive shadow-destructive',
        ghost:
          'hover:bg-muted hover:border-muted hover:text-foreground dark:hover:bg-muted/50 dark:hover:border-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        link: 'text-muted-foreground underline-offset-4 hover:underline hover:opacity-90',
        outline:
          'bg-background border-border hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-t-input dark:border-l-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground border-t-input/40 border-l-input/40 shadow-input dark:shadow-border',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground border-secondary/80 shadow-secondary dark:border-secondary-foreground/40 border-t-secondary/40 dark:border-t-secondary-foreground/60 border-l-secondary/40 dark:border-l-secondary-foreground/60',
      },
    },
  },
)

function Button({
  animate = false,
  className,
  extrude = false,
  size = 'default',
  variant = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ animate, className, extrude, size, variant }))}
      data-animate={animate}
      data-extrude={extrude}
      data-slot="button"
      {...props}
    />
  )
}

export { Button, buttonVariants }
