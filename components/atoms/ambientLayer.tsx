import { AmbientOrbs } from './ambientOrbs';

export const AmbientLayer = () => (
  <div className="ambient-layer" aria-hidden>
    <div className="ambient-chrome-edge ambient-chrome-edge--bottom" />
    <AmbientOrbs />
  </div>
);
