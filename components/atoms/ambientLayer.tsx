import { AmbientOrbs } from './ambientOrbs';

export const AmbientLayer = () => (
  <div className="ambient-layer" aria-hidden>
    <div className="ambient-mobile-fade ambient-mobile-fade--top">
      <div className="ambient-mobile-fade__glow ambient-mobile-fade__glow--top" />
    </div>
    <div className="ambient-mobile-fade ambient-mobile-fade--bottom">
      <div className="ambient-mobile-fade__glow ambient-mobile-fade__glow--bottom" />
    </div>
    <AmbientOrbs />
  </div>
);
