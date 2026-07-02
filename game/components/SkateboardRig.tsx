'use client';

import { PLAYER, SKATE_RIG } from '../constants';
import { SkateboardModel } from './SkateboardModel';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { SkateParts } from './SkateboardModel';

export type SkateMotionState = {
  speed: number;
  steerInput: number;
  isGrounded: boolean;
};

type SkateboardRigProps = {
  motionRef: React.RefObject<SkateMotionState>;
};

const ZERO_MOTION: SkateMotionState = { speed: 0, steerInput: 0, isGrounded: true };
const MAX_DELTA = 1 / 30;

type BaseRotations = {
  boardZ: number;
  boardY: number;
  frontY: number;
  rearY: number;
};

export function SkateboardRig({ motionRef }: SkateboardRigProps) {
  const partsRef = useRef<SkateParts | null>(null);
  const baseRef = useRef<BaseRotations | null>(null);
  const truckSteer = useRef(0);
  const lean = useRef(0);
  const wheelRoll = useRef(0);

  useFrame((_, delta) => {
    const parts = partsRef.current;
    if (!parts) return;

    if (!baseRef.current) {
      baseRef.current = {
        boardZ: parts.board.rotation.z,
        boardY: parts.board.position.y,
        frontY: parts.frontPivot.rotation.y,
        rearY: parts.rearPivot.rotation.y,
      };
    }
    const base = baseRef.current;

    const motion = motionRef.current ?? ZERO_MOTION;
    const dt = Math.min(delta, MAX_DELTA);
    const speedFactor = Math.min(1, Math.abs(motion.speed) / PLAYER.moveSpeed);
    const canSteer = Math.abs(motion.speed) >= PLAYER.minSteerSpeed;
    const steerFactor = canSteer ? speedFactor : 0;
    const airborneFactor = motion.isGrounded ? 1 : 0.2;

    const targetTruckSteer =
      motion.steerInput * SKATE_RIG.maxTruckSteer * steerFactor * airborneFactor;
    const targetLean =
      -motion.steerInput * SKATE_RIG.maxLean * steerFactor * airborneFactor;

    truckSteer.current = damp(
      truckSteer.current,
      targetTruckSteer,
      SKATE_RIG.steerDamping,
      dt,
    );
    lean.current = damp(lean.current, targetLean, SKATE_RIG.leanDamping, dt);

    // Solo la tavola si inclina (rollio attorno all'asse di marcia)
    parts.board.rotation.z = base.boardZ + lean.current;
    // Compensazione verticale: alza la tavola quanto scende il bordo in curva,
    // così il lato interno non entra nelle ruote
    const dip = parts.boardHalfWidth * Math.sin(Math.abs(lean.current));
    parts.board.position.y = base.boardY + dip * SKATE_RIG.leanLift;

    // Truck sterzano in yaw opposto: front e rear ruotano in versi contrari,
    // così le ruote interne alla curva si avvicinano e le esterne si allontanano
    parts.frontPivot.rotation.y = base.frontY + truckSteer.current;
    parts.rearPivot.rotation.y = base.rearY - truckSteer.current;

    if (Math.abs(motion.speed) > 0.01) {
      wheelRoll.current += motion.speed * SKATE_RIG.wheelSpin * dt;
    }

    parts.wheelFront.rotation.x = wheelRoll.current;
    parts.wheelBack.rotation.x = -wheelRoll.current;
  });

  return <SkateboardModel partsRef={partsRef} />;
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
