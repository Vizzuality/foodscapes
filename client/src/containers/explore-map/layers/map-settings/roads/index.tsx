import { useCallback } from 'react';

import { mapSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Checkbox } from 'components/ui/checkbox';
import { Label } from 'components/ui/label';

const Roads = () => {
  const { roads } = useRecoilValue(mapSettingsAtom);
  const setMapSettings = useSetRecoilState(mapSettingsAtom);

  const handleChange = useCallback(
    (v) => {
      setMapSettings((prev) => ({
        ...prev,
        roads: v,
      }));
    },
    [setMapSettings]
  );

  return (
    <div className="group flex grow items-center space-x-2">
      <Checkbox
        id="roads-checkbox"
        checked={roads}
        className="pointer-events-auto h-3 w-3 rounded-sm group-hover:border-navy-400 group-hover:bg-navy-200/25"
        onCheckedChange={handleChange}
      />

      <Label
        className="cursor-pointer font-light transition-colors group-hover:text-navy-400"
        htmlFor="roads-checkbox"
      >
        Roads
      </Label>
    </div>
  );
};

export default Roads;
