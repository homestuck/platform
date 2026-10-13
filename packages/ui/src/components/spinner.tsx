import { cn } from 'cn'
import { LoaderIcon } from 'lucide-react'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      data-slot="spinner"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="status"
      {...props}
    />
  )
}

export { Spinner }
