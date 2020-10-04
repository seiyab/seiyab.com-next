import clsx from 'clsx';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { ClazzName } from '@puml/domain';
import ReloadButton from '@puml/components/ReloadButton';
import { globalState } from '@puml/state';

interface Props {
  className?: string;
}

const PumlInput: React.FC<Props> = ({ className }) => {
  const [, setState] = useRecoilState(globalState);
  const reload = useCallback(
    () => {
      setState(dummyState)
    },
    [setState],
  )
  return (
    <div className={clsx(className)}>
      <header>
        Paste PlantUML here
        <ReloadButton onClick={reload}/>
      </header>
      <section>
      </section>
    </div>
  );
};

const dummyState = {
  clazzes: {
    ['User' as ClazzName]: {
      name: 'User' as ClazzName,
    },
    ['Tweet' as ClazzName]: {
      name: 'Tweet' as ClazzName,
    },
  },
  links: [
    {
      src: { target: 'User' as ClazzName },
      dst: { target: 'Tweet' as ClazzName },
    }
  ],
};

export default PumlInput;