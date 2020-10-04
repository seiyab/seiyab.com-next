import { ClazzName } from '@puml/domain';

export interface PositionState {
  clazzes: Record<ClazzName, Position>,
}

export interface Position {
  x: number;
  y: number;
}