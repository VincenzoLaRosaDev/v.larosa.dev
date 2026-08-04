/** True only for mouse/trackpad pointers that can hover — never touch. */
export function isDesktopHover() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
}

/** Title / arrow accent is driven only by JS hover (fine pointer), never by
 *  sticky CSS :hover on touch. */
export function cardTitleHoverClasses(isActive: boolean) {
  return `transition-all ${isActive ? 'text-primary' : ''}`;
}

export function cardArrowHoverClasses(isActive: boolean) {
  // Default to currentColor so arrows follow the tile foreground.
  return `transition-all ${isActive ? 'fill-primary' : 'fill-current'}`;
}

export function cardArrowRotationClasses(isActive: boolean) {
  return isActive ? 'rotate-0' : 'rotate-45';
}

export function cardHoverHandlers(
  setHoveredIndex: (index: number | null) => void,
  key: number,
) {
  return {
    onMouseEnter: () => {
      if (isDesktopHover()) setHoveredIndex(key);
    },
    onMouseLeave: () => {
      if (isDesktopHover()) setHoveredIndex(null);
    },
  };
}
