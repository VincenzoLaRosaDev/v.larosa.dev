'use client';

import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { PLAYER, WORLD } from '../constants';
import { SkateboardRig, type SkateMotionState } from './SkateboardRig';
import { useFrame } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { Group } from 'three';

const MAX_DELTA = 1 / 30;

export const Player = forwardRef<Group>(function Player(_, ref) {
  const groupRef = useRef<Group>(null);
  const inputRef = useKeyboardInput();
  const velocityY = useRef(0);
  const horizontalSpeed = useRef(0);
  const isGrounded = useRef(true);
  const jumpConsumed = useRef(false);
  const motionRef = useRef<SkateMotionState>({
    speed: 0,
    steerInput: 0,
    isGrounded: true,
  });

  useImperativeHandle(ref, () => groupRef.current as Group);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const dt = Math.min(delta, MAX_DELTA);
    const input = inputRef.current;

    let throttle = 0;
    if (input.forward) throttle += 1;
    if (input.backward) throttle -= 1;

    const targetSpeed = throttle * PLAYER.moveSpeed;
    const rate = throttle !== 0 ? PLAYER.acceleration : PLAYER.deceleration;
    horizontalSpeed.current = approach(
      horizontalSpeed.current,
      targetSpeed,
      rate * dt,
    );

    const speed = horizontalSpeed.current;
    const heading = group.rotation.y;

    if (Math.abs(speed) > 0.001) {
      group.position.x += Math.sin(heading) * speed * dt;
      group.position.z += Math.cos(heading) * speed * dt;
    }

    const steerInput = (input.left ? 1 : 0) - (input.right ? 1 : 0);
    if (steerInput !== 0 && Math.abs(speed) >= PLAYER.minSteerSpeed) {
      const steerFactor = Math.min(1, Math.abs(speed) / PLAYER.moveSpeed);
      group.rotation.y += steerInput * PLAYER.steerSpeed * steerFactor * dt;
    }

    motionRef.current.speed = speed;
    motionRef.current.steerInput = steerInput;
    motionRef.current.isGrounded = isGrounded.current;

    group.position.x = clamp(group.position.x, -WORLD.bounds, WORLD.bounds);
    group.position.z = clamp(group.position.z, -WORLD.bounds, WORLD.bounds);

    velocityY.current += PLAYER.gravity * dt;

    if (input.jump && isGrounded.current && !jumpConsumed.current) {
      velocityY.current = PLAYER.jumpForce;
      isGrounded.current = false;
      jumpConsumed.current = true;
    }

    if (!input.jump) {
      jumpConsumed.current = false;
    }

    group.position.y += velocityY.current * dt;

    if (group.position.y <= WORLD.groundY) {
      group.position.y = WORLD.groundY;
      velocityY.current = 0;
      isGrounded.current = true;
    } else {
      isGrounded.current = false;
    }
  });

  return (
    <group ref={groupRef} position={[0, WORLD.groundY, 0]}>
      <SkateboardRig motionRef={motionRef} />
    </group>
  );
});

function approach(current: number, target: number, maxDelta: number) {
  if (current < target) {
    return Math.min(target, current + maxDelta);
  }
  return Math.max(target, current - maxDelta);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
