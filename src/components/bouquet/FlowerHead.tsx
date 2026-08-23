import type { FlowerRenderStyle } from "@/types/bouquet";

function shade(hex: string, amount: number) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0xff) + amount);
  const b = clamp((num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

const RADIAL_PETALS: Record<
  string,
  { count: number; width: number; height: number; petalPath: string; center: number }
> = {
  sunflower: {
    count: 8,
    width: 12,
    height: 18,
    petalPath: "M0,-8 C6,-20 6,-38 0,-44 C-6,-38 -6,-20 0,-8 Z",
    center: 16,
  },
  lily: {
    count: 6,
    width: 14,
    height: 24,
    petalPath: "M0,-6 C10,-18 10,-34 0,-42 C-10,-34 -10,-18 0,-6 Z",
    center: 8,
  },
  daisy: {
    count: 10,
    width: 8,
    height: 18,
    petalPath: "M0,-6 C6,-16 6,-30 0,-36 C-6,-30 -6,-16 0,-6 Z",
    center: 9,
  },
};

function LegoFlower({ type, color }: { type: string; color: string }) {
  const outline = "rgba(0,0,0,0.35)";

  if (type === "rose") {
    return (
      <g stroke={outline} strokeWidth="2">
        {[0, 90, 180, 270].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <rect x="-16" y="-34" width="32" height="32" rx="4" fill={color} />
            <circle cy="-18" r="6" fill={shade(color, -20)} />
          </g>
        ))}
        <rect x="-14" y="-14" width="28" height="28" rx="4" fill={shade(color, -30)} />
        <circle r="6" fill={color} />
      </g>
    );
  }

  if (type === "tulip") {
    return (
      <g stroke={outline} strokeWidth="2">
        <rect x="-20" y="-24" width="40" height="36" rx="6" fill={color} />
        <circle cx="-10" cy="-24" r="6" fill={shade(color, 20)} />
        <circle cx="10" cy="-24" r="6" fill={shade(color, 20)} />
        <rect x="-7" y="12" width="14" height="12" rx="3" fill={shade(color, -20)} />
      </g>
    );
  }

  const ring = RADIAL_PETALS[type] || RADIAL_PETALS.daisy;
  return (
    <g stroke={outline} strokeWidth="2">
      <g fill={color}>
        {Array.from({ length: ring.count }, (_, i) => (
          <g key={i} transform={`rotate(${(i * 360) / ring.count})`}>
            <rect
              x={-ring.width / 2}
              y={-ring.height - ring.center + 6}
              width={ring.width}
              height={ring.height}
              rx="3"
            />
          </g>
        ))}
      </g>
      <circle
        r={ring.center}
        fill={type === "sunflower" ? "#78350f" : shade(color, -60)}
      />
    </g>
  );
}

function RealisticFlower({ type, color }: { type: string; color: string }) {
  if (type === "rose") {
    return (
      <g>
        <ellipse rx="26" ry="16" fill={shade(color, -20)} transform="rotate(20)" />
        <ellipse rx="24" ry="15" fill={color} transform="rotate(-15)" />
        <ellipse rx="20" ry="13" fill={shade(color, 20)} transform="rotate(60)" />
        <circle r="9" fill={shade(color, -50)} />
        <circle cx="-2" cy="-2" r="4" fill={shade(color, 60)} opacity="0.6" />
      </g>
    );
  }

  if (type === "tulip") {
    return (
      <g>
        <path
          d="M-20,10 C-24,-8 -12,-26 0,-24 C-6,-14 -8,0 -6,14 Z"
          fill={shade(color, -15)}
        />
        <path
          d="M20,10 C24,-8 12,-26 0,-24 C6,-14 8,0 6,14 Z"
          fill={shade(color, 15)}
        />
        <path
          d="M-8,12 C-10,-6 -4,-24 0,-26 C4,-24 10,-6 8,12 Z"
          fill={color}
        />
        <line x1="0" y1="-24" x2="0" y2="10" stroke={shade(color, -40)} strokeWidth="1" opacity="0.5" />
      </g>
    );
  }

  const ring = RADIAL_PETALS[type] || RADIAL_PETALS.daisy;
  return (
    <g>
      {Array.from({ length: ring.count }, (_, i) => (
        <path
          key={i}
          d={ring.petalPath}
          fill={i % 2 === 0 ? shade(color, -15) : shade(color, 15)}
          transform={`rotate(${(i * 360) / ring.count})`}
        />
      ))}
      <circle
        r={ring.center}
        fill={type === "sunflower" ? "#78350f" : shade(color, -60)}
      />
      {type === "sunflower" && (
        <>
          <circle cx="-5" cy="-3" r="1.5" fill="#451a03" />
          <circle cx="4" cy="-6" r="1.5" fill="#451a03" />
          <circle cx="6" cy="4" r="1.5" fill="#451a03" />
          <circle cx="-3" cy="6" r="1.5" fill="#451a03" />
          <circle r="1.5" fill="#451a03" />
        </>
      )}
    </g>
  );
}

function ClassicFlower({ type, color }: { type: string; color: string }) {
  if (type === "rose") {
    return (
      <g>
        <circle cx="0" cy="0" r="24" fill={color} />
        <path
          d="M-14,-4 C-6,-18 10,-17 14,-2 C9,5 0,10 -8,7 C-14,5 -17,2 -14,-4Z"
          fill="rgba(255,255,255,0.18)"
        />
        <circle cx="0" cy="2" r="9" fill="rgba(255,255,255,0.12)" />
      </g>
    );
  }

  if (type === "tulip") {
    return (
      <g>
        <path
          d="M-18,14 C-21,0 -14,-20 -6,-19 C-2,-18 0,-12 0,-12 C0,-12 3,-18 8,-19 C16,-20 21,0 18,14 Z"
          fill={color}
        />
        <rect x="-6" y="12" width="12" height="10" rx="4" fill={color} />
      </g>
    );
  }

  if (type === "sunflower") {
    return (
      <g>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 360) / 12;
          return (
            <ellipse
              key={i}
              cx="0"
              cy="-26"
              rx="8"
              ry="18"
              fill={color}
              transform={`rotate(${angle})`}
            />
          );
        })}
        <circle cx="0" cy="0" r="17" fill="#7c2d12" />
        <circle cx="0" cy="0" r="11" fill="#92400e" />
      </g>
    );
  }

  if (type === "lily") {
    return (
      <g>
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 360) / 6;
          return (
            <ellipse
              key={i}
              cx="0"
              cy="-18"
              rx="10"
              ry="24"
              fill={color}
              transform={`rotate(${angle})`}
            />
          );
        })}
        <circle cx="0" cy="0" r="8" fill="#f59e0b" opacity="0.8" />
      </g>
    );
  }

  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i * 360) / 10;
        return (
          <ellipse
            key={i}
            cx="0"
            cy="-18"
            rx="7"
            ry="18"
            fill={color}
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle cx="0" cy="0" r="9" fill="#facc15" />
    </g>
  );
}

export function FlowerHead({
  type,
  color,
  renderStyle = "classic",
}: {
  type: string;
  color: string;
  renderStyle?: FlowerRenderStyle;
}) {
  if (renderStyle === "lego") return <LegoFlower type={type} color={color} />;
  if (renderStyle === "realistic")
    return <RealisticFlower type={type} color={color} />;
  return <ClassicFlower type={type} color={color} />;
}
