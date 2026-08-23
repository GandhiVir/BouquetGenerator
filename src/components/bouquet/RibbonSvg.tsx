export function RibbonSvg({ color }: { color: string }) {
  return (
    <g transform="translate(230 502)">
      <path
        d="M-70 0 C-52 -30 -18 -36 0 -7 C18 -36 52 -30 70 0 C46 6 22 16 0 32 C-22 16 -46 6 -70 0Z"
        fill={color}
      />
      <circle cx="0" cy="5" r="12" fill={color} />
      <path d="M-16 12 L-40 86 L-10 58 Z" fill={color} opacity="0.92" />
      <path d="M16 12 L40 86 L10 58 Z" fill={color} opacity="0.92" />
    </g>
  );
}
