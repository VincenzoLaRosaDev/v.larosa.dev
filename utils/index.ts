export function getOffset(el?: HTMLElement | null) {
  if (el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }
  return undefined;
}

/** Inner padding of the sidebar nav block — shared by the block itself and by
 *  the desktop scroll-title menu that anchors inside it. */
export const SIDE_NAV_PAD_X = 24;
export const SIDE_NAV_PAD_Y = 28;

export * from './glass';
export * from './mosaic';
export * from './useGlassCardFocus';
export * from './device';
export * from './useIsLiteExperience';
