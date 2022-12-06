// [x, y]
export type GridPoint = [number, number];

export const CELL_SIZE = 32;

export const VIEWPORT_WIDTH = 640;
export const VIEWPORT_HEIGHT = 360;

export const fromGrid = (n: number) => n * CELL_SIZE;

/**
 * 
 * @param coord position in pixel
 * @returns number on grid
 */
export const toGrid = (coord: number) => Math.round(coord / CELL_SIZE);