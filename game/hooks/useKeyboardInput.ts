'use client';

import { useEffect, useRef } from 'react';

export type InputState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

const INITIAL_INPUT: InputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
};

export function useKeyboardInput() {
  const inputRef = useRef<InputState>({ ...INITIAL_INPUT });

  useEffect(() => {
    const setKey = (code: string, pressed: boolean) => {
      switch (code) {
        case 'ArrowUp':
        case 'KeyW':
          inputRef.current.forward = pressed;
          break;
        case 'ArrowDown':
        case 'KeyS':
          inputRef.current.backward = pressed;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          inputRef.current.left = pressed;
          break;
        case 'ArrowRight':
        case 'KeyD':
          inputRef.current.right = pressed;
          break;
        case 'Space':
          inputRef.current.jump = pressed;
          break;
        default:
          break;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') event.preventDefault();
      setKey(event.code, true);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      setKey(event.code, false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return inputRef;
}
