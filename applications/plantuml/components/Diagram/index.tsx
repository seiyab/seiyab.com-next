import clsx from 'clsx';
import { useState, useCallback } from 'react';
import { useRecoilState } from "recoil"

import { Clazz, ClazzName } from '@puml/domain';
import { globalState } from '@puml/state';

import ClazzView from './ClazzView';
import { usePositionState } from './hooks/usePositionState';

interface Props {
  className?: string;
}

const Diagram: React.FC<Props> = ({ className }) => {
  const [pumlState] = useRecoilState(globalState);
  const [positionState, setPositionState] = usePositionState(pumlState);
  const moveClazz = useCallback(
    (clazzName: ClazzName, dx: number, dy: number) => {
      setPositionState((prev) => ({
        clazzes: {
          ...prev.clazzes,
          [clazzName]: {
            x: (prev.clazzes as any)[clazzName].x + dx,
            y: (prev.clazzes as any)[clazzName].y + dy,
          }
        }
      }))
    },
    [setPositionState],
  );

  return (
    <div className={clsx(className)}>
      <header>
      diagram here
      </header>
      <section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="600"
          height="400"
        >
          <g>
            {Object.values<Clazz>(pumlState.clazzes).map(
              (clazz) => {
                const position = (positionState.clazzes as any)[clazz.name];
                return position && <g key={clazz.name}><ClazzView
                  x={position.x}
                  y={position.y}
                  clazz={clazz}
                  onMove={moveClazz}
                /></g>;
              }
            )}
          </g>
        </svg>
      </section>
    </div>
  )
}


export default Diagram;