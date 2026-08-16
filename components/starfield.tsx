'use client';

import React, { useSyncExternalStore } from 'react';
import { clsx } from 'clsx';
import { useReducedMotion } from 'motion/react';
import { useWindowSize } from 'react-use';
import { StarField } from 'starfield-react';

interface StarfieldProps {
  speed?: number;
  className?: string;
}

const emptySubscribe = () => () => {};

const Starfield = ({ speed = 0.5, className }: StarfieldProps) => {
  const { width, height } = useWindowSize();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none fixed left-0 top-0 -z-10 h-full w-full select-none overflow-hidden',
        className
      )}
    >
      {mounted && (
        <StarField
          fps={60}
          width={width}
          height={height}
          speed={shouldReduceMotion ? 0 : speed}
          noBackground
        />
      )}
    </div>
  );
};

export default Starfield;
