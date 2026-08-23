export default function ClutchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="sans-serif"
        fill="currentColor"
      >
        C
      </text>
    </svg>
  );
}
