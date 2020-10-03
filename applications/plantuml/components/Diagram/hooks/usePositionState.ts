import {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import { ClazzName } from '@puml/domain';
import { State } from '@puml/state';

export const usePositionState = (pumlState: State): [PositionState, Dispatch<SetStateAction<PositionState>>] => {
  const [positionState, setPositionState] = useState<PositionState>({ clazzes: {}});
  const newClazzes = Object.keys(pumlState.clazzes).filter(
    (clazzName) => !(clazzName in positionState.clazzes)
  );
  if (newClazzes.length != 0) {
    setPositionState((prev) => {
      const newPositions = Object.fromEntries(
        newClazzes.map((name) => [name, { x: 0, y: 0}]),
      );
      return {
        clazzes: {
          ...prev.clazzes,
          ...newPositions
        }
      };
    })
  }
  return [positionState, setPositionState];
}

interface PositionState {
  clazzes: Record<ClazzName, Position>,
}

interface Position {
  x: number;
  y: number;
}