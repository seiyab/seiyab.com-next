import {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import { State } from '@puml/state';

import { Position, PositionState } from '../position';
import { range } from '@/generic/array';

export const usePositionState = (pumlState: State): [PositionState, Dispatch<SetStateAction<PositionState>>] => {
  const [positionState, setPositionState] = useState<PositionState>({ clazzes: {}});
  const newClazzes = Object.keys(pumlState.clazzes).filter(
    (clazzName) => !(clazzName in positionState.clazzes)
  );
  const newPositions = useLocate(newClazzes.length);
  if (newClazzes.length != 0) {
    const incomingPositions = Object.fromEntries(
      range(newClazzes.length).map((i) => [newClazzes[i], newPositions[i]])
    )
    setPositionState((prev) => {
      return {
        clazzes: {
          ...prev.clazzes,
          ...incomingPositions,
        }
      };
    })
  }
  return [positionState, setPositionState];
}

const useLocate = (n: number): Position[] => {
  const [i, setI] = useState(0);
  if (n === 0) return [];
  const locate = (j: number): Position => {
    const d = Math.floor(j / 16) * 5;
    const k = j % 16;
    return {
      x: k%4 * 120 + 10 + d,
      y: Math.floor(k / 4) * 80 + 10 + d,
    };
  }
  setI((prev) => prev + n);
  return range(n).map((j) => locate(i + j));
}