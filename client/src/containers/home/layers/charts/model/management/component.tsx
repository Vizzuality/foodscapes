/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { stepAtom } from 'store/home';

import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRecoilValue } from 'recoil';

import { STEP_DURATION } from 'containers/home/animations/constants';

import { GLTFResult } from '../types';

export function Management() {
  const { nodes } = useGLTF('/models/city-3.glb') as GLTFResult;
  const step = useRecoilValue(stepAtom);

  return (
    <mesh
      geometry={nodes.Management.geometry}
      position={[0.1934, 0.1831, -0.4007]}
      rotation={[0, -0.784, 0]}
      scale={[0.0063, 0.0347, 0.0063]}
      castShadow
    >
      {/* <meshStandardMaterial attach="material" color="#E8856B" /> */}
      <motion.meshStandardMaterial
        animate={`step${step}`}
        variants={{
          initial: { color: '#FFF' },
          step0: { color: '#FFF' },
          step1: { color: '#FFF' },
          step2: { color: '#E8856B' },
          step3: { color: '#FFF' },
          step4: { color: '#E8856B' },
        }}
        transition={{
          duration: STEP_DURATION,
        }}
      />
    </mesh>
  );
}

useGLTF.preload('/models/city-3.glb');

export default Management;
