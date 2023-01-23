// create a react context called SQLContext
// create a hook that use the context
// create a provider that wraps the app
//
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useComlink } from 'react-use-comlink';

import type { Remote } from 'comlink';
import { SQLComlink } from 'workers/sql';

const SQLContext = createContext<SQLComlink>(null);

const WORKER_VERSION = 0;

export function SQLProvider({ children }) {
  const instanceRef = useRef<Remote<SQLComlink>>(null);
  const [init, setInit] = useState(false);
  const { proxy } = useComlink<typeof SQLComlink>(
    () => new Worker(new URL('workers/sql', import.meta.url)),
    [WORKER_VERSION]
  );

  useEffect(() => {
    if (!init) {
      (async () => {
        const i = await new proxy();

        await i.init();

        instanceRef.current = i;

        setInit(true);
      })();
    }
  }, [init, proxy]);

  return (
    <SQLContext.Provider
      //
      value={instanceRef.current}
    >
      {children}
    </SQLContext.Provider>
  );
}

export function useSQL() {
  return useContext(SQLContext);
}

export default SQLProvider;
