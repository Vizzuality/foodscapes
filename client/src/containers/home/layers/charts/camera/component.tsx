import { useState } from 'react';

import { stepAtom } from 'store/home';

import { useFrame, useThree } from '@react-three/fiber';
import { useRecoilValue } from 'recoil';
import { Vector3 } from 'three';

const POSITIONS = {
  0: [1, 3, 3],
  1: [2, 2, 2],
  2: [1, 3, 1],
  3: [3, 4, 4],
  4: [1, 3, 3],
};

const TARGETS = {
  0: [0, 0, 0],
  1: [0, 0, 0],
  2: [0, 0, 0],
  3: [0, 0, 0],
  4: [0, 0, 0],
};

const Camera = () => {
  const { camera } = useThree();
  const step = useRecoilValue(stepAtom);

  const [smoothPosition] = useState(() => new Vector3(1, 4, 4));
  const [smoothTarget] = useState(() => new Vector3(0, 0, 0));

  useFrame(() => {
    const [x, y, z] = POSITIONS[step] || POSITIONS[0];
    const [tx, ty, tz] = TARGETS[step] || TARGETS[0];

    // Position
    const pos = new Vector3(x, y, z);
    smoothPosition.lerp(pos, 0.1);

    // Target
    const target = new Vector3(tx, ty, tz);
    smoothTarget.lerp(target, 0.1);

    camera.position.copy(smoothPosition);
    camera.lookAt(smoothTarget);
  });

  return null;
};

export default Camera;
