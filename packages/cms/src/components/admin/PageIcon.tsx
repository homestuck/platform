import { cn } from 'cn'

const paths = {
  16: 'M3 3h10a1 1 0 011 1v8a1 1 0 01-1 1h-10a1 1 0 01-1-1v-8a1 1 0 011-1zM3.5 4a.5.5 0 00-.5.5v.5h1v-1h-.5zM5 4v1h1v-1h-1zM7 4v1h6v-.5a.5.5 0 00-.5-.5h-5.5zM3 6v5.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-5.5h-10zM8 6.5a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5zM8 7a1.5 3.5 0 00-.75 1.75h1.5a1.5 3.5 0 00-.75-1.75zM8 11a1.5 3.5 0 00.75-1.75h-1.5a1.5 3.5 0 00.75 1.75zM6 8.75h.75a1.5 3.5 0 01.75-1.75 3 3.5 0 00-1.5 1.75zM9.25 8.75h.75a3 3.5 0 00-1.5-1.75 1.5 3.5 0 01.75 1.75zM6.75 9.25h-.75a3 3.5 0 001.5 1.75 1.5 3.5 0 01-.75-1.75zM10 9.25h-.75a1.5 3.5 0 01-.75 1.75 3 3.5 0 001.5-1.75z',
  24: 'M6.5 7H17.5A1.5 1.5 0 0119 8.5V15.5A1.5 1.5 0 0117.5 17H6.5A1.5 1.5 0 015 15.5V8.5A1.5 1.5 0 016.5 7zM7 8A1 1 0 006 9H7V8zM8 8V9H9V8H8zM10 8V9H18A1 1 0 0017 8H10zM6 10V15A1 1 0 007 16H17A1 1 0 0018 15V10H6z',
}

export const PageIcon: React.FC<{
  readonly className?: string
  readonly size?: 16 | 24
}> = ({ className, size = 24 }) => (
  <svg
    className={cn(['icon icon--page', className])}
    fill="none"
    height={size}
    viewBox={`0 0 ${String(size)} ${String(size)}`}
    width={size}
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d={paths[size]} fill="currentColor" fillRule="evenodd" />
  </svg>
)
