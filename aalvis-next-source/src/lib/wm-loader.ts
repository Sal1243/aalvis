/* Custom next/image loader for a static export.

   Wikimedia now REJECTS hotlinked thumbnails whose width is not one of the
   standard production sizes (T414805 — "Use thumbnail sizes listed on
   https://w.wiki/GHai"). Arbitrary widths such as 480px/828px/1600px return
   HTTP 400, so every requested width is snapped UP to the nearest allowed
   step before the URL is built.

   Allowed widths: 20, 40, 60, 120, 250, 330, 500, 960, 1280, 1920, 3840.   */

const ALLOWED = [20, 40, 60, 120, 250, 330, 500, 960, 1280, 1920, 3840] as const;
const MAX_W = 1920; // 3840 is reserved: never needed for these layouts

export function snapWidth(w: number): number {
  const target = Math.max(20, Math.ceil(w));
  for (const step of ALLOWED) if (step >= target) return Math.min(step, MAX_W);
  return MAX_W;
}

export default function wmLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const clean = src.split("?")[0];
  const m = clean.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/);
  if (!m) return clean; // local (/images/…) or any other origin: pass through
  const w = snapWidth(width);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/${m[3]}/${w}px-${m[3]}`;
}
