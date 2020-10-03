import clsx from 'clsx';
import { useState } from 'react';
import { useRecoilState } from "recoil"

import { Clazz, ClazzName } from '@puml/domain';
import { globalState } from '@puml/state';

interface Props {
  className?: string;
}

const Diagram: React.FC<Props> = ({ className }) => {
  const [pumlState] = useRecoilState(globalState);
  const [positionState, setPositionState] = useState({ clazzez: {}});
  return (
    <div className={clsx(className)}>
      diagram here
    </div>
  )
}

interface PositionState {
  clazzez: Record<ClazzName, Clazz>,
}

export default Diagram;