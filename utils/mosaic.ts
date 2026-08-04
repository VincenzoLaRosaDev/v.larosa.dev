/** Tone ramp for mosaic tiles. Cycling through four widely spaced tones keeps
 *  both horizontal (i, i+1) and vertical (i, i+2) neighbours on different
 *  values, so the mosaic reads without needing dividers. */
const TILE_TONES = [
  'var(--surface-1)',
  'var(--surface-3)',
  'var(--surface-2)',
  'var(--surface-4)',
] as const;

export type TilePattern = 'brick' | 'half' | 'full' | 'row' | 'stagger';

/** Named tones are focal points — use them sparingly, not in a ramp.
 *  paper / signal (and invert alias) flip to a light foreground scheme. */
export type TileTone = number | 'accent' | 'invert' | 'paper' | 'signal';

export function tileToneVar(tone: TileTone = 0) {
  if (tone === 'paper') return 'var(--surface-paper)';
  if (tone === 'signal' || tone === 'invert') return 'var(--surface-invert)';
  if (tone === 'accent') return 'var(--surface-accent)';
  return TILE_TONES[Math.abs(tone) % TILE_TONES.length];
}

export function isLightTileTone(tone: TileTone = 0) {
  return tone === 'paper' || tone === 'signal' || tone === 'invert';
}

/**
 * Soft 40/60 stagger for a 5-column grid (2+3 spans).
 * Even rows: 40/60 — odd rows: 60/40. Orphan last item spans the full row.
 */
export function staggerSpanClass(index: number, total = 0) {
  if (total > 0 && total % 2 === 1 && index === total - 1) {
    return 'md:col-span-5';
  }

  const left = index % 2 === 0;
  const flip = Math.floor(index / 2) % 2 === 1;

  if (!flip) {
    return left ? 'md:col-span-2' : 'md:col-span-3';
  }
  return left ? 'md:col-span-3' : 'md:col-span-2';
}

/** Span classes per breakpoint: one column below 768px, two up to 1440px, three
 *  above it.
 *  - row: the entire row, for tiles with their own internal columns.
 *  - full: a whole row at two columns, two thirds at three, so the neighbouring
 *    tile fills the rest instead of the text trailing off into empty space.
 *  - half: one column per tile, so two or three tiles per row.
 *  - stagger: use with a 5-col grid — see staggerSpanClass.
 *  - brick: at two columns one full-width tile every third item; at three
 *    columns alternating 2+1 / 1+2 pairs, which always fills a row exactly. */
export function tileSpanClass(index: number, pattern: TilePattern = 'brick') {
  if (pattern === 'stagger') return staggerSpanClass(index);
  if (pattern === 'row') return 'md:col-span-2 wide:col-span-3';
  if (pattern === 'full') return 'md:col-span-2 wide:col-span-2';
  if (pattern === 'half') return 'md:col-span-1 wide:col-span-1';

  const twoCol = index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1';
  const pairLeads = Math.floor(index / 2) % 2 === 0;
  const threeCol =
    (index % 2 === 0) === pairLeads ? 'wide:col-span-2' : 'wide:col-span-1';

  return `${twoCol} ${threeCol}`;
}
