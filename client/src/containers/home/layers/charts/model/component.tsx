import { useMemo } from 'react';

import { useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';

import Management from './management';
import Physical from './physical';
import SocioEconomic from './socioeconomic';
import Water from './water';

export function Model() {
  const { size, viewport } = useThree();

  const { position, rotation } = useMemo(() => {
    const { width } = size;
    const { factor } = viewport;

    const w = Math.min(width, 1280) / factor;

    const x = w / 2 / 2;

    return {
      position: new Vector3(x, 0, 0),
      rotation: new Euler(
        //
        Math.PI * 0.25,
        -x / 10 + -Math.PI * 0.25,
        Math.PI * 0.04,
        'XYZ'
      ),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group position={position} rotation={rotation}>
      <Water />

      <SocioEconomic />

      <Management />

      <Physical />
    </group>
  );
}

export default Model;
