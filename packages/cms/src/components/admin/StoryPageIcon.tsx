import { cn } from 'cn'

const paths = {
  16: 'M2 2H6.5A1.5 1.5 0 018 3 1.5 1.5 0 019.5 2H14A1 1 0 0115 3V12A1 1 0 0114 13H9.5A1.5 1.5 0 008 14 1.5 1.5 0 006.5 13H2A1 1 0 011 12V3A1 1 0 012 2ZM2 3V12H6.5A2.5 2.5 0 017.5 12.165V4A1 1 0 006.5 3ZM9.5 3A1 1 90 008.5 4V12.165A2.5 2.5 90 019.5 12H14V3ZM3.5 4h2.5a.5 .5 0 01 0 1h-2.5a.5 .5 0 01 0 -1zM3.5 6h2.5a.5 .5 0 01 0 1h-2.5a.5 .5 0 01 0 -1zM10 4h2.5a.5 .5 0 01 0 1h-2.5a.5 .5 0 01 0 -1zM10 6h2.5a.5 .5 0 01 0 1h-2.5a.5 .5 0 01 0 -1z',
  24: '',
}

export const StoryPageIcon: React.FC<{
  readonly className?: string
  readonly size?: 16 | 24
}> = ({ className, size = 24 }) => (
  <svg
    className={cn(['icon icon--story-page', className])}
    fill="none"
    height={size}
    viewBox={`0 0 ${String(size)} ${String(size)}`}
    width={size}
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d={paths[size]} fill="currentColor" fillRule="evenodd" />
  </svg>
)
