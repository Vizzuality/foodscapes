import Management from './management';
import Physical from './physical';
import SocioEconomic from './socioeconomic';
import Water from './water';

export function Model() {
  return (
    <group>
      <Water />

      <SocioEconomic />

      <Management />

      <Physical />
    </group>
  );
}

export default Model;
