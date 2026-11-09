import { cn } from 'cn'

const paths = {
  16: 'M4.5 2.5H12A1 1 0 0113 3.5V12.5A1 1 0 0112 13.5H4.5A1.5 1.5 0 013 12V4A1.5 1.5 0 014.5 2.5zM4.5 3.5A.5.5 0 004 4V10.585A1.5 1.5 0 014.5 10.5H12V3.5H4.5zM4.5 12.5H12V11.5H4.5A.5.5 0 004.5 12.5zM5.75 4.5H10.25A.75.75 0 0110.25 6H5.75A.75.75 0 015.75 4.5z',
  24: 'M8 5H16.5A1.5 1.5 0 0118 6.5V17.5A1.5 1.5 0 0116.5 19H8A2 2 0 016 17V7A2 2 0 018 5zM8 6A1 1 0 007 7V15.757A2 2 0 018 15.5H17V6.5A.5.5 0 0016.5 6H8zM7.75 18H16.5A.5.5 0 0017 17.5V16.5H7.75A.75.75 0 007.75 18zM9 7.5H15A1 1 0 0115 9.5H9A1 1 0 019 7.5z',
}

export const StoryIcon: React.FC<{
  readonly className?: string
  readonly size?: 16 | 24
}> = ({ className, size = 24 }) => (
  <svg
    className={cn(['icon icon--story', className])}
    fill="none"
    height={size}
    viewBox={`0 0 ${String(size)} ${String(size)}`}
    width={size}
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" d={paths[size]} fill="currentColor" fillRule="evenodd" />
  </svg>
)
