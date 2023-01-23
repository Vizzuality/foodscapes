import { useEffect } from 'react';

import { useComlink } from 'react-use-comlink';

import { MyClass } from 'workers/sql';

const Data = () => {
  const { proxy } = useComlink<typeof MyClass>(
    () => new Worker(new URL('workers/sql', import.meta.url)),
    [0]
  );

  useEffect(() => {
    (async () => {
      const instance = await new proxy(0);

      await instance.increment(1);

      console.log(await instance.counter);
    })();
  }, [proxy]);

  return <></>;
};

export default Data;
