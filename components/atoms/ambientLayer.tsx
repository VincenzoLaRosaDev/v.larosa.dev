import { AmbientOrbs } from './ambientOrbs';
import { MouseGlow } from './mouseCursor';

export const AmbientLayer = () => (
  <div className="ambient-layer" aria-hidden>
    <AmbientOrbs />
    {/* <MouseGlow /> */}
  </div>
);
