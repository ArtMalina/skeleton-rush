export type Point = [number, number];
export interface IMouseInput {
    init(): void;
    point: Point | undefined;
}