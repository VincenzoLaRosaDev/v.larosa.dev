'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { Object3D } from 'three';
import { Vector3 } from 'three';
import { CAMERA } from '../constants';

type FollowCameraProps = {
  target: React.RefObject<Object3D | null>;
};

const offset = new Vector3(...CAMERA.offset);
const lookAtPoint = new Vector3();

export function FollowCamera({ target }: FollowCameraProps) {
  const { camera } = useThree();
  const initialized = useRef(false);

  useFrame(() => {
    const targetObject = target.current;
    if (!targetObject) return;

    camera.position.set(
      targetObject.position.x + offset.x,
      targetObject.position.y + offset.y,
      targetObject.position.z + offset.z,
    );

    lookAtPoint.set(
      targetObject.position.x,
      targetObject.position.y + CAMERA.lookAtHeight,
      targetObject.position.z,
    );
    camera.lookAt(lookAtPoint);

    if (!initialized.current) {
      camera.updateProjectionMatrix();
      initialized.current = true;
    }
  });

  return null;
}
