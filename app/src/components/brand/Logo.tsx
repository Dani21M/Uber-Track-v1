export function Logo({ size = 26 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo/rutia-logo-negativo.svg"
        alt=""
        width={size}
        height={size}
        className="rounded-md"
      />
      <span className="text-base font-bold tracking-tight text-texto">Rutia</span>
    </div>
  )
}
