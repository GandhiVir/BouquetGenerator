import { renderToStaticMarkup } from "react-dom/server";
import { BouquetSvgContent } from "@/components/bouquet/BouquetPreview";
import type { BouquetConfig, FlatFlower, LayoutItem } from "@/types/bouquet";

const BOUQUET_HEIGHT = 620;
const CARD_TOP_GAP = 20;
const CARD_WIDTH = 380;
const CARD_X = 40;
const CARD_TOP_PAD = 32;
const CARD_BOTTOM_PAD = 32;
const OCCASION_HEIGHT = 26;
const LINE_HEIGHT = 24;
const SENDER_GAP = 18;
const SENDER_HEIGHT = 22;
const MAX_MESSAGE_LINES = 4;
const CHARS_PER_LINE = 38;

const MESSAGE_FADE_KEYFRAMES =
  "@keyframes fade-up { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }";

function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    } else {
      current = next;
    }
  }
  if (lines.length < maxLines && current) lines.push(current);

  const consumed = lines.join(" ").length;
  if (lines.length === maxLines && words.join(" ").length > consumed) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] =
      last.length > maxCharsPerLine - 1
        ? `${last.slice(0, maxCharsPerLine - 1)}…`
        : `${last}…`;
  }

  return lines.length ? lines : [""];
}

export function buildBouquetSvgMarkup(
  config: BouquetConfig,
  flatFlowers: FlatFlower[],
  layout: LayoutItem[],
  animated: boolean,
): string {
  const messageLines = wrapText(config.message, CHARS_PER_LINE, MAX_MESSAGE_LINES);
  const cardHeight =
    CARD_TOP_PAD +
    OCCASION_HEIGHT +
    messageLines.length * LINE_HEIGHT +
    SENDER_GAP +
    SENDER_HEIGHT +
    CARD_BOTTOM_PAD;
  const cardTop = BOUQUET_HEIGHT + CARD_TOP_GAP;
  const totalHeight = cardTop + cardHeight + 24;

  const ribbonDelay = 0.15 + flatFlowers.length * 0.09 + 0.15;
  const messageDelay = ribbonDelay + 0.55;

  let textY = cardTop + CARD_TOP_PAD + 14;
  const occasionY = textY;
  textY += OCCASION_HEIGHT;
  const messageStartY = textY;
  textY += messageLines.length * LINE_HEIGHT;
  const senderY = textY + SENDER_GAP;

  const markup = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 460 ${totalHeight}`}>
      <BouquetSvgContent
        config={config}
        flatFlowers={flatFlowers}
        layout={layout}
        animated={animated}
        canvasHeight={totalHeight}
      />

      {animated && <style>{MESSAGE_FADE_KEYFRAMES}</style>}

      <g
        style={
          animated
            ? {
                opacity: 0,
                animation: `fade-up 0.6s ease-out ${messageDelay}s both`,
              }
            : undefined
        }
      >
        <rect
          x={CARD_X}
          y={cardTop}
          width={CARD_WIDTH}
          height={cardHeight}
          rx="20"
          fill="#ffffff"
          stroke="#f1e5da"
        />
        <text
          x="230"
          y={occasionY}
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12"
          letterSpacing="3"
          fill="#e11d48"
        >
          {config.occasion.toUpperCase()}
        </text>
        {messageLines.map((line, index) => (
          <text
            key={index}
            x="230"
            y={messageStartY + index * LINE_HEIGHT}
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="17"
            fill="#44403c"
          >
            {line}
          </text>
        ))}
        <text
          x="230"
          y={senderY}
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontSize="14"
          fill="#78716c"
        >
          — {config.senderName || "Anonymous"}
        </text>
      </g>
    </svg>,
  );

  return markup;
}
