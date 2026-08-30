const SPOTIFY_URL_PATTERN =
  /open\.spotify\.com\/(?:intl-[a-z]{2}(?:-[A-Z]{2})?\/)?(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/i;

export function getSpotifyEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const match = url.match(SPOTIFY_URL_PATTERN);
  if (!match) return null;
  const [, type, id] = match;
  return `https://open.spotify.com/embed/${type}/${id}?autoplay=1`;
}
