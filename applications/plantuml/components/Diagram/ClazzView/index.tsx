import clsx from 'clsx';
import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Clazz, ClazzName } from "@puml/domain";

import { Position } from '../position';

import style from './style.module.css';

type Props =
  & JSX.IntrinsicElements['svg']
  & {
    clazz: Clazz;
    onMove?: (clazzName: ClazzName, position: Position) => void;
  };

type DragState = {
  original: Position,
  start: Position,
}

type SVGMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent> & PointerEvent;

const parse = (a?: string | number) => {
  const r = Number(a);
  if (Number.isNaN(r)) return undefined;
  return r;
};

const ClazzView: React.FC<Props> = ({ clazz, children: _, onMove, ...props }) => {
  const propsPosition = useMemo(() => ({
    x: parse(props.x) ?? 0,
    y: parse(props.y) ?? 0,
  }), [props.x, props.y]);

  const [dragState, setDragState] = useState<DragState | null>(null);
  const startDrag = useCallback(
    (event: SVGMouseEvent) => {
      const newState = {
        original: propsPosition,
        start: { x: event.pageX, y: event.pageY },
        current: { x: event.pageX, y: event.pageY }
      }
      event.currentTarget.setPointerCapture(event.pointerId)
      setDragState(newState)
    },
    [propsPosition],
  );
  const dragging = useCallback(
    (event: SVGMouseEvent) => {
      if (dragState === null) return;
      if (!onMove) return;
      onMove(clazz.name, {
        x: dragState.original.x + event.pageX - dragState.start.x,
        y: dragState.original.y + event.pageY - dragState.start.y,
      })
    },
    [dragState, onMove, clazz.name],
  );
  const endDrag = useCallback(
    (event: SVGMouseEvent)  => {
      event.currentTarget.releasePointerCapture(event.pointerId);
      setDragState(null);
      if (dragState === null) return;
      if (!onMove) return;
      onMove(clazz.name, {
        x: dragState.original.x + event.pageX - dragState.start.x,
        y: dragState.original.y + event.pageY - dragState.start.y,
      })
    },
    [dragState, onMove, clazz.name],
  );
  return (
    <svg
      {...props}
      width={clazzSize.width}
      height={clazzSize.height}
      onMouseDown={startDrag}
      onMouseMove={dragging}
      onMouseUp={endDrag}
      className={clsx(props.className, dragState ? style.grabbing : style.grab)}
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