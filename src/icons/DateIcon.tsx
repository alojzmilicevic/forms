export const DateIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="12" r="1" fill="currentColor" />
    <circle cx="10" cy="12" r="1" fill="currentColor" />
    <circle cx="13" cy="12" r="1" fill="currentColor" />
    <path d="M7 2V6M13 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

