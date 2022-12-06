export type Direction = 'up' | 'down' | 'left' | 'right';

export interface IDirectionInput {
    init(): void;
    get direction(): Direction | undefined;
}