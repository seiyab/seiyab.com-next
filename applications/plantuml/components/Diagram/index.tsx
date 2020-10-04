import clsx from 'clsx';
import { useCallback } from 'react';
import { useRecoilState } from "recoil"

import { find } from '@/generic/string';
import { Clazz, ClazzName } from '@puml/domain';
import { globalState } from '@puml/state';

import ClazzView from './ClazzView';
import LinkView from './LinkView';
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
            x: (find(prev.clazzes, clazzName)?.x ?? 0) + dx,
            y: (find(prev.clazzes, clazzName)?.y ?? 0) + dy,
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
          {pumlState.links.map((link) => {
            const leftPosition = find(positionState.clazzes, link.left.target);
            const rightPosition = find(positionState.clazzes, link.right.target);
            if (leftPosition === null || rightPosition === null) return null;
            return <LinkView
              key={link.left.target + '#' + link.right.target}
              link={link}
              leftPosition={leftPosition}
              rightPosition={rightPosition}
            />;
          })}
        </svg>
      </section>
    </div>
  )
}


export default Diagram;