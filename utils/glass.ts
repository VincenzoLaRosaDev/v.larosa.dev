const DESKTOP_HOVER_MQ = '(min-width: 1024px)';

export function isDesktopHover() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia(DESKTOP_HOVER_MQ).matches
  );
}

/** Shared classes for interactive glass cards (projects, blogs, experiences). */
export function glassHoverClasses(isActive: boolean) {
  return [
    'rounded-2xl overflow-hidden glass-hover',
    isActive && 'glass-hover-active',
  ]
    .filter(Boolean)
    .join(' ');
}

export function cardDimmedClasses(isDimmed: boolean) {
  return isDimmed ? 'lg:opacity-50' : '';
}

export function cardTitleHoverClasses(isActive: boolean) {
  return isActive ? 'text-primary' : '';
}

export function cardArrowHoverClasses(isActive: boolean) {
  return `fill-text transition-all ${isActive ? 'fill-primary' : ''}`;
}

export function cardArrowRotationClasses(
  isActive: boolean,
  group: 'group' | 'group/link' = 'group',
) {
  const hoverClass =
    group === 'group/link'
      ? 'lg:group-hover/link:rotate-0'
      : 'lg:group-hover:rotate-0';
  return isActive ? 'rotate-0' : `rotate-45 ${hoverClass}`;
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
