import clsx from 'clsx';
import { useCallback } from 'react';
import { useRecoilState } from "recoil"

import { find } from '@/generic/string';
import { Clazz, ClazzName } from '@puml/domain';
import { globalState } from '@puml/state';

import ClazzView from './ClazzView';
import LinkView from './LinkView';
import { usePositionState } from './hooks/usePositionState';
import { Position } from './position';

interface Props {
  className?: string;
}

const Diagram: React.FC<Props> = ({ className }) => {
  const [pumlState] = useRecoilState(globalState);
  const [positionState, setPositionState] = usePositionState(pumlState);
  const moveClazz = useCallback(
    (clazzName: ClazzName, { x, y }: Position) => {
      setPositionState((prev) => ({
        clazzes: {
          ...prev.clazzes,
          [clazzName]: { x, y },
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
                const position = find(positionState.clazzes, clazz.name);
                return position && <g key={clazz.name}><ClazzView
                  x={position.x}
                  y={position.y}
                  clazz={clazz}
                  onMove={moveClazz}
                /></g>;
              }
            )}
          </g>
          {pumlState.links.map((link) => {
            const srcPosition = find(positionState.clazzes, link.src.target);
            const dstPosition = find(positionState.clazzes, link.dst.target);
            if (srcPosition === null || dstPosition === null) return null;
            return <LinkView
              key={link.src.target + '#' + link.dst.target}
              link={link}
              srcPosition={srcPosition}
              dstPosition={dstPosition}
            />;
          })}
        </svg>
      </section>
    </div>
  )
}


export default Diagram;