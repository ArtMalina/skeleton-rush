import { Animations, AnimationSet } from "@/types/animations";

export const skeletonAnimations: AnimationSet = {
    [Animations.IdleDown]: [
        [0, 2]
    ],
    [Animations.IdleUp]: [
        [0, 0]
    ],
    [Animations.IdleLeft]: [
        [0, 1]
    ],
    [Animations.IdleRight]: [
        [0, 3]
    ],
    [Animations.WalkRight]: [
        [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    ],
    [Animations.WalkLeft]: [
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1],
    ],
    [Animations.WalkDown]: [
        [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],
    ],
    [Animations.WalkUp]: [
        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
    ],
}