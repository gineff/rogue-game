import * as Types from '@type/game'

export const skeletonMotions = {
  [Types.IdleMotionType.look2right]: {
    originPosition: [0, 4],
    frames: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  [Types.IdleMotionType.look2left]: {
    originPosition: [0, 0],
    frames: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  [Types.MoveMotionType.move2right]: {
    originPosition: [0, 7],
    frames: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  [Types.MoveMotionType.move2left]: {
    originPosition: [0, 3],
    frames: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  [Types.AttackMotionType.attack2right]: {
    originPosition: [0, 6],
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
  },
  [Types.AttackMotionType.attack2left]: {
    originPosition: [0, 2],
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
  },
  [Types.DestructionMotionType.destructionFromRight]: {
    originPosition: [0, 5],
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
  },
  [Types.DestructionMotionType.destructionFromLeft]: {
    originPosition: [0, 1],
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
  },
} as Types.CellSpriteMotions
