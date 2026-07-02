export const COLORS = {
  background: '#121816',
  fog: '#121816',
  floor: '#28332f',
  grid: '#3d4f48',
  gridSection: '#51665c',
  player: '#facc15',
  lightSky: '#d4e8e0',
  lightGround: '#2a3832',
} as const;

/** Lunghezza tavola nel mondo — riferimento storico del prototipo: 1.0 */
export const SKATE_MODEL = {
  path: '/models/skate.glb',
  targetLength: 1.8,
  /** skate.glb: asse lungo Z, avanti = +Z (come il movimento del player) */
  rotation: [0, 0, 0] as const,
  nodes: {
    root: 'Skate',
    board: 'board',
    truckFront: 'truck_front',
    truckBack: 'truck_back',
    wheelsFront: 'wheels_front',
    wheelsBack: 'wheels_back',
    wheelFront: 'wheel_front',
    wheelBack: 'wheel_back',
  },
} as const;

const SKATE_SCALE = SKATE_MODEL.targetLength;

/** Animazione sterzo su nodi del modello riggato */
export const SKATE_RIG = {
  /** Rollio massimo della tavola in curva */
  maxLean: 0.3,
  /** Yaw massimo di ciascun truck (front e rear ruotano in versi opposti) */
  maxTruckSteer: 0.16,
  leanDamping: 14,
  steerDamping: 16,
  /** Rotazione ruote (rad) per unità di velocità */
  wheelSpin: 2.8,
  /**
   * Quanto la tavola si solleva mentre rolla, per non entrare nelle ruote.
   * 1 = compensa esattamente la discesa del bordo; >1 lascia più margine.
   */
  leanLift: 1.1,
} as const;

export const LIGHTING = {
  ambient: 0.68,
  hemisphere: 0.45,
  /** Ridotta e spostata lateralmente per evitare hotspot speculari sulla tavola */
  key: 0.95,
  fill: 0.05,
  keyPosition: [14, 26, 5] as const,
  fillPosition: [-12, 16, -10] as const,
  fogNear: 38,
  fogFar: 72,
} as const;

export const PLAYER = {
  /** Velocità massima avanti/indietro */
  moveSpeed: 6 + (SKATE_SCALE - 1) * 2.5,
  /** Quanto rapidamente si raggiunge la velocità target (unità/s²) */
  acceleration: 32,
  /** Frenata / attrito quando non si accelera (unità/s²) */
  deceleration: 48,
  /** Velocità minima per poter sterzare */
  minSteerSpeed: 0.45,
  steerSpeed: 2.4 / Math.sqrt(SKATE_SCALE),
  jumpForce: 7.5,
  gravity: -24,
  lookAtHeight: 0.25 * SKATE_SCALE,
} as const;

export const WORLD = {
  groundY: 0,
  floorSize: 40,
  bounds: 18,
} as const;

export const CAMERA = {
  offset: [16, 20, 16] as const,
  lookAtHeight: PLAYER.lookAtHeight,
  /** Zoom ridotto per inquadrare lo skate più grande */
  zoom: 204 / SKATE_SCALE,
} as const;
