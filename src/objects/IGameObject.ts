import { GridPoint } from "@/helpers/grid";
import { ISpriteConfig } from "@/sprites/ISpriteConfig";

export interface IGameObject {
    x: number;
    y: number;
    isManagedByUser?: boolean;
    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint): void;
    update(updates: any): void;
}

export interface IGameObjectConfig {
    x: number;
    y: number;
    src: string;
    collision?: GridPoint[];
    isManagedByUser?: boolean;
    spriteCfg?: Partial<ISpriteConfig<IGameObject>>;
}