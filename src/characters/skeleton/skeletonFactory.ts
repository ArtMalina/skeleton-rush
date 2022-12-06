import skeletonSrc from './assets/skeleton.png';
import { skeletonAnimations } from "./animations";
import { Animations } from "@/types/animations";
import Skeleton from "./Skeleton";
import { CELL_SIZE } from '@/helpers/grid';

export default function getSkeleton({ x, y, isManagedByUser }: { x: number, y: number, isManagedByUser?: boolean }) {
    return new Skeleton({
        x,
        y,
        src: skeletonSrc,
        isManagedByUser,
        collision: [
            [0, 0],
            // [0, -1]
        ],
        spriteCfg: {
            width: 2 * CELL_SIZE, height: 2 * CELL_SIZE,
            sx: 64, sy: 64,
            dx: -1, dy: 26,
            animationFrameLimit: 6,
            animations: skeletonAnimations,
            currentAnimation: Animations.IdleDown
        }
    });
}