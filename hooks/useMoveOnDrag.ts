import {
  useState,
  useCallback,
} from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  originalPosition: Position,
  startCursor: Position,
}

type DragEvent<T extends Element> = React.MouseEvent<T, MouseEvent> & React.PointerEvent<T>

export const useMoveOnDrag = <T extends Element>(argPosition: Position, onMove: (pos: Position) => void): useDragReturn<T> => {
  const [state, setState] = useState<DragState | null>(null);
  const startDrag = useCallback(
    (event: DragEvent<T>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setState({
        originalPosition: {
          x: argPosition.x,
          y: argPosition.y,
        },
        startCursor: {
          x: event.pageX,
          y: event.pageY,
        }
      });
    },
    [argPosition.x, argPosition.y],
  );
  const dragging = useCallback(
    (event: DragEvent<T>) => {
      if (state === null) return;
      const currentCursor = {
        x: event.pageX,
        y: event.pageY,
      };
      onMove({
        x: state.originalPosition.x + currentCursor.x - state.startCursor.x,
        y: state.originalPosition.y + currentCursor.y - state.startCursor.y,
      })
    },
    [state, onMove],
  );
  const endDrag = useCallback(
    (event: DragEvent<T>) => {
      event.currentTarget.releasePointerCapture(event.pointerId)
      setState(null);
      if (state === null) return;
      const currentCursor = {
        x: event.pageX,
        y: event.pageY,
      };
      onMove({
        x: state.originalPosition.x + currentCursor.x - state.startCursor.x,
        y: state.originalPosition.y + currentCursor.y - state.startCursor.y,
      })
    },
    [state, onMove],
  );
  return {
    onMouseDown: startDrag,
    onMouseMove: dragging,
    onMouseUp: endDrag,
    dragging: state !== null,
  };
}

interface useDragReturn<T extends Element> {
  onMouseDown: (event: DragEvent<T>) => void;
  onMouseMove: (event: DragEvent<T>) => void;
  onMouseUp: (event: DragEvent<T>) => void;
  dragging: boolean;
}
