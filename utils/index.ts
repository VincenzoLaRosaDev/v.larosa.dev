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

export * from './glass';
export * from './useGlassCardFocus';
export * from './device';
