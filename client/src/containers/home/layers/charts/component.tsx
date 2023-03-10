/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { Suspense } from 'react';

import { stepAtom } from 'store/home';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { NoToneMapping } from 'three';

import { STEP_DURATION } from 'containers/home/animations/constants';

import Camera from './camera';
import Lights from './lights';
import Model from './model';

export function LayerChart() {
  const step = useRecoilValue(stepAtom);

  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-full"
      animate={`step${step}`}
      variants={{
        initial: { opacity: 0 },
        step0: { opacity: 1 },
        step1: { opacity: 1 },
        step2: { opacity: 1 },
        step3: { opacity: 1 },
        step4: { opacity: 1 },
        step5: { opacity: 0 },
        step6: { opacity: 0 },
        step7: { opacity: 0 },
        step8: { opacity: 0 },
        step9: { opacity: 0 },
      }}
      transition={{
        duration: STEP_DURATION,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          physicallyCorrectLights: true,
          toneMapping: NoToneMapping,
        }}
        shadows
      >
        <Camera />

        <Lights />

        <Suspense>
          <Model />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

export default LayerChart;
