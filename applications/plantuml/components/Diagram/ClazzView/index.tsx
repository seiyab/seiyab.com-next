import clsx from 'clsx';
import {
  useCallback,
  useState,
} from 'react';

import { Clazz, ClazzName } from "@puml/domain";

import style from './style.module.css';

type Props =
  & JSX.IntrinsicElements['svg']
  & {
    clazz: Clazz;
    onMove?: (clazzName: ClazzName, dx: number, dy: number) => void;
  };

type DragState = {
  originalX: number,
  originalY: number,
  currentX: number,
  currentY: number,
}

type SVGMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent> & PointerEvent;

const parse = (a?: string | number) => {
  const r = Number(a);
  if (Number.isNaN(r)) return undefined;
  return r;
};

const ClazzView: React.FC<Props> = ({ clazz, children: _, onMove, ...props }) => {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const dx = dragState ? dragState.currentX - dragState.originalX : 0;
  const dy = dragState ? dragState.currentY - dragState.originalY : 0;
  const startDrag = useCallback(
    (event: SVGMouseEvent) => {
      const newState = {
        originalX: event.pageX,
        originalY: event.pageY,
        currentX: event.pageX,
        currentY: event.pageY,
      }
      event.currentTarget.setPointerCapture(event.pointerId)
      setDragState(newState)
    },
    [],
  );
  const dragging = useCallback(
    (event: SVGMouseEvent) => {
      const x = event.pageX;
      const y = event.pageY;
      setDragState((prev) => {
        if (prev === null) return null;
        return {
          ...prev,
          currentX: x,
          currentY: y,
        }
      });
    },
    [],
  );
  const endDrag = useCallback(
    (event: SVGMouseEvent & PointerEvent)  => {
      event.currentTarget.releasePointerCapture(event.pointerId);
      if (dragState === null) return;
      if (onMove) {
        onMove(
          clazz.name,
          event.pageX - dragState.originalX,
          event.pageY - dragState.originalY,
        );
      }
      setDragState(null);
    },
    [dragState, onMove, clazz.name],
  );
  return (
    <svg
      {...props}
      x={(parse(props.x) ?? 0) + dx}
      y={(parse(props.y) ?? 0) + dy}
      width="100"
      height="60"
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

export default ClazzView;