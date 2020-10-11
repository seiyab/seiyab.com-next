import clsx from 'clsx';
import {
  useCallback,
} from 'react';

import { Clazz, ClazzName } from "@puml/domain";

import { Position } from '../position';

import style from './style.module.css';
import { useMoveOnDrag } from '@/hooks/useMoveOnDrag';

type Props =
  & JSX.IntrinsicElements['svg']
  & {
    clazz: Clazz;
    x: number;
    y: number;
    onMove?: (clazzName: ClazzName, position: Position) => void;
  };

const ClazzView: React.FC<Props> = ({ clazz, x, y, children: _, onMove, ...props }) => {
  const move = useCallback((position: Position) => {
    if (!onMove) return;
    onMove(clazz.name, position);
  }, [clazz.name, onMove]);

  const drag = useMoveOnDrag<SVGSVGElement>({ x, y }, move);
  return (
    <svg
      {...props}
      x={x}
      y={y}
      width={clazzSize.width}
      height={clazzSize.height}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      className={clsx(props.className, drag.dragging ? style.grabbing : style.grab)}
    >
      <rect width="100" height="60" fill="white" stroke="black"
      />
      <text
        fontSize="16"
        textAnchor="middle"
        x="50%"
        y="25"
      >
        {clazz.name}
      </text>
    </svg>
  )
};

export const clazzSize = {
  width: 100,
  height: 60,
} as const;

export default ClazzView;