import { stepAtom } from 'store/home';

import { useFrame, useThree } from '@react-three/fiber';
import { useRecoilValue } from 'recoil';
import { Vector3 } from 'three';

const vec3 = new Vector3(1, 4, 4);

const POSITIONS = {
  0: [1, 4, 4],
  1: [1, 5, 3],
  2: [2, 3, 4],
  3: [3, 4, 4],
  4: [3, 4, 4],
};

const Camera = () => {
  const { camera } = useThree();
  const step = useRecoilValue(stepAtom);

  useFrame(() => {
    const [x, y, z] = POSITIONS[step];
    vec3.set(x, y, z);
    camera.position.lerp(vec3, 0.075);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default Camera;
