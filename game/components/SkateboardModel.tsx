'use client';

import { SKATE_MODEL } from '../constants';
import { useGLTF } from '@react-three/drei';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Box3, Group, Mesh, Object3D, Vector3 } from 'three';

useGLTF.preload(SKATE_MODEL.path);

const size = new Vector3();

export type SkateParts = {
  /** Tavola: rollio (lean) in curva — unico elemento che si inclina */
  board: Object3D;
  /** Pivot truck anteriore: sterza (yaw) attorno all'asse verticale sull'assale */
  frontPivot: Object3D;
  /** Pivot truck posteriore: yaw opposto al front */
  rearPivot: Object3D;
  wheelFront: Object3D;
  wheelBack: Object3D;
  /** Semilarghezza tavola (unità locali): serve a compensare il dip in curva */
  boardHalfWidth: number;
};

type SkateboardModelProps = {
  partsRef: React.RefObject<SkateParts | null>;
};

function tuneMaterials(root: Object3D) {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (!('roughness' in material) || material.roughness === undefined) continue;
      material.roughness = Math.max(material.roughness, 0.78);
      if ('metalness' in material && material.metalness !== undefined) {
        material.metalness = Math.min(material.metalness, 0.15);
      }
    }
  });
}

type RiggedModel = {
  root: Object3D;
  parts: SkateParts | null;
};

/**
 * Clona la scena e costruisce i pivot di sterzo: ogni truck (+ le sue ruote) è
 * agganciato a un gruppo posizionato sull'assale, centrato in X (x=0). Così lo
 * sterzo è un puro yaw attorno all'asse verticale: le ruote non entrano nel
 * terreno né bucano la tavola.
 */
function buildRig(scene: Object3D): RiggedModel {
  const root = scene.clone(true);
  tuneMaterials(root);

  const skate = root.getObjectByName(SKATE_MODEL.nodes.root) ?? root;
  const board = skate.children.find((c) => c.name === SKATE_MODEL.nodes.board) ?? null;
  const truckFront = skate.getObjectByName(SKATE_MODEL.nodes.truckFront) ?? null;
  const truckBack = skate.getObjectByName(SKATE_MODEL.nodes.truckBack) ?? null;
  const wheelsFront = skate.getObjectByName(SKATE_MODEL.nodes.wheelsFront) ?? null;
  const wheelsBack = skate.getObjectByName(SKATE_MODEL.nodes.wheelsBack) ?? null;
  const wheelFront = skate.getObjectByName(SKATE_MODEL.nodes.wheelFront) ?? null;
  const wheelBack = skate.getObjectByName(SKATE_MODEL.nodes.wheelBack) ?? null;

  if (!board || !truckFront || !truckBack || !wheelsFront || !wheelsBack || !wheelFront || !wheelBack) {
    return { root, parts: null };
  }

  root.updateMatrixWorld(true);

  const frontCenter = new Box3().setFromObject(truckFront).getCenter(new Vector3());
  const rearCenter = new Box3().setFromObject(truckBack).getCenter(new Vector3());
  skate.worldToLocal(frontCenter);
  skate.worldToLocal(rearCenter);
  // Centro in X: yaw simmetrico attorno alla mezzeria della tavola
  frontCenter.x = 0;
  rearCenter.x = 0;

  const frontPivot = new Group();
  frontPivot.name = 'frontPivot';
  frontPivot.position.copy(frontCenter);
  skate.add(frontPivot);
  frontPivot.attach(truckFront);
  frontPivot.attach(wheelsFront);

  const rearPivot = new Group();
  rearPivot.name = 'rearPivot';
  rearPivot.position.copy(rearCenter);
  skate.add(rearPivot);
  rearPivot.attach(truckBack);
  rearPivot.attach(wheelsBack);

  // Semilarghezza tavola nelle UNITÀ LOCALI di skate (board.position.y vive lì).
  // Il bbox è in world: lo riporto in locale dividendo per la scala di skate,
  // altrimenti la compensazione sarebbe sbagliata di un fattore = scala FBX.
  root.updateMatrixWorld(true);
  const boardBox = new Box3().setFromObject(board);
  const skateScale = new Vector3();
  skate.getWorldScale(skateScale);
  const worldHalfWidth = (boardBox.max.x - boardBox.min.x) / 2;
  const boardHalfWidth = worldHalfWidth / (skateScale.x || 1);

  return {
    root,
    parts: { board, frontPivot, rearPivot, wheelFront, wheelBack, boardHalfWidth },
  };
}

export function SkateboardModel({ partsRef }: SkateboardModelProps) {
  const { scene } = useGLTF(SKATE_MODEL.path);
  const rootRef = useRef<Group>(null);

  const rig = useMemo(() => buildRig(scene), [scene]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.rotation.set(...SKATE_MODEL.rotation);

    const box = new Box3().setFromObject(rig.root);
    box.getSize(size);
    const longest = Math.max(size.x, size.y, size.z);
    const scale = longest > 0 && Number.isFinite(longest) ? SKATE_MODEL.targetLength / longest : 1;
    root.scale.setScalar(scale);

    box.setFromObject(root);
    root.position.y = Number.isFinite(box.min.y) ? -box.min.y : 0;

    partsRef.current = rig.parts;

    return () => {
      partsRef.current = null;
    };
  }, [rig, partsRef]);

  return (
    <group ref={rootRef}>
      <primitive object={rig.root} dispose={null} />
    </group>
  );
}
