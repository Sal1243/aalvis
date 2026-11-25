/* Custom next/image loader for a static export: rewrites Wikimedia Commons
   originals to their thumbnail service at the requested width, keeping
   responsive srcsets without Vercel's image optimizer. */
export default function wmLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const clean = src.split("?")[0];
  const m = clean.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/);
  if (!m) return clean;
  const w = Math.min(width, 1600);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/${m[3]}/${w}px-${m[3]}`;
}
