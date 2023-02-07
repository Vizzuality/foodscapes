import { stepAtom } from 'store/home';

import { useFrame, useThree } from '@react-three/fiber';
import { useRecoilValue } from 'recoil';
import { Vector3 } from 'three';

const pos = new Vector3(1, 4, 4);

const POSITIONS = {
  0: [1, 4, 4],
  1: [4, 3, 2],
  2: [1, 3, 1],
  3: [3, 4, 4],
  4: [3, 4, 4],
};
const Camera = () => {
  const { camera } = useThree();
  const step = useRecoilValue(stepAtom);

  useFrame(() => {
    const [x, y, z] = POSITIONS[step] || POSITIONS[0];

    // Move camera to position
    pos.set(x, y, z);
    camera.position.lerp(pos, 0.1);

    // Look at target
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default Camera;
