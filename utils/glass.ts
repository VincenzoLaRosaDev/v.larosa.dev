const DESKTOP_HOVER_MQ = '(min-width: 1024px)';

export function isDesktopHover() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia(DESKTOP_HOVER_MQ).matches
  );
}

/** Shared classes for interactive content bands (projects, blogs, experiences). */
export function glassHoverClasses(isActive: boolean) {
  return ['band band-hover', isActive && 'band-active']
    .filter(Boolean)
    .join(' ');
}

export function cardDimmedClasses(isDimmed: boolean) {
  return isDimmed ? 'lg:opacity-50' : '';
}

export function cardTitleHoverClasses(
  isActive: boolean,
  group: 'group' | 'group/link' = 'group',
) {
  const hoverClass =
    group === 'group/link'
      ? 'lg:group-hover/link:text-primary'
      : 'lg:group-hover:text-primary';
  return `transition-all ${hoverClass} ${isActive ? 'text-primary' : ''}`;
}

export function cardArrowHoverClasses(
  isActive: boolean,
  group: 'group' | 'group/link' = 'group',
) {
  const hoverFill =
    group === 'group/link'
      ? 'lg:group-hover/link:fill-primary'
      : 'lg:group-hover:fill-primary';
  return `transition-all ${isActive ? 'fill-primary' : 'fill-text'} ${hoverFill}`;
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
