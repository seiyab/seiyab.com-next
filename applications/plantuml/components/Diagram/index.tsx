import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useRecoilState } from "recoil"

import { find } from '@/generic/string';
import { Clazz, ClazzName } from '@puml/domain';
import { globalState } from '@puml/state';

import ClazzView from './ClazzView';
import LinkView from './LinkView';
import { usePositionState } from './hooks/usePositionState';
import { Position } from './position';
import { useMoveOnDrag } from '@/hooks/useMoveOnDrag';

interface Props {
  className?: string;
}

const size = {
  width: 600,
  height: 400,
} as const;

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
  const [frame, setFrame] = useState({ x: 0, y: 0 });
  const drag = useMoveOnDrag<SVGRectElement>(frame, setFrame);

  return (
    <div className={clsx(className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size.width}
        height={size.height}
        viewBox={`${-frame.x} ${-frame.y} ${size.width} ${size.height}`}
      >
        {/* listener */}
        <rect
          width={size.width}
          height={size.height}
          x={-frame.x}
          y={-frame.y}
          onMouseDown={drag.onMouseDown}
          onMouseMove={drag.onMouseMove}
          onMouseUp={drag.onMouseUp}
          pointerEvents="visible"
          fill="none"
          stroke="none"
        />
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
    </div>
  )
}


export default Diagram;