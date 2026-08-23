export function downloadSvg(node: SVGSVGElement | null) {
  if (!node) return;

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(node);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "digital-bouquet.svg";
  link.click();
  URL.revokeObjectURL(url);
}
