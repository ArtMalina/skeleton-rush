import { CELL_SIZE } from '@/helpers/grid';
import gravestone1Src from './assets/gravestone1.png';
import Gravestone from "./Gravestone";

export default function getGravestone({ x, y }: { x: number, y: number }) {
    return new Gravestone({
        x,
        y,
        src: gravestone1Src,
        collision: [
            [0, 0],
            [1, 0],
            // [0, -1],
            // [1, -1],
        ],
        spriteCfg: {
            width: 2 * CELL_SIZE, height: 2 * CELL_SIZE,
            sx: 600, sy: 600,
            dx: 0, dy: 28,
        }

    });
}