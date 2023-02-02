import { step, steps } from 'store/sync-url';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import Wrapper from 'containers/wrapper/component';

import Button from 'components/button';

const SyncUrl = () => {
  const s = useRecoilValue(step);
  const setStep = useSetRecoilState(step);

  const ss = useRecoilValue(steps);
  const setSteps = useSetRecoilState(steps);

  return (
    <section className="pt-24">
      <Wrapper>
        <div className="flex space-x-5">
          <Button
            theme="primary"
            size="base"
            onClick={() => {
              setStep((prev) => prev + 1);
            }}
          >
            <span>{s}</span>
          </Button>

          <Button
            theme="primary"
            size="base"
            onClick={() => {
              const s1 = s + 1;
              setStep(() => s1);

              //
              const newSteps = [...ss, s1];
              setSteps(newSteps);
            }}
          >
            <span>Add step</span>
          </Button>
        </div>

        {ss.map((st, i) => {
          return <div key={`${st}-${i}`}>{st}</div>;
        })}
      </Wrapper>
    </section>
  );
};

export default SyncUrl;
