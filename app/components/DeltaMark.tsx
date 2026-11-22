// The Δ mark: delta means change, the thing CDC captures,
// and Delta tables are what the lakehouse stores.
export default function DeltaMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      style={{ display: "block" }}
    >
      <path d="M12 2.5 22.5 21.5H1.5Z" fill="var(--cobalt)" />
      <path d="M12 9.6 17.1 18.6H6.9Z" fill="var(--paper)" />
    </svg>
  );
}
