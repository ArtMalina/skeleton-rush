import { CELL_SIZE, fromGrid, GridPoint, toGrid } from "@/helpers/grid";
import { Direction } from "@/inputs/IDirectionInput";
import { Point } from "@/inputs/IMouseInput";
import Sprite from "@/sprites/Sprite";
import { IGameObject, IGameObjectConfig } from "./IGameObject";

export interface IUpdatesPayload {
    move?: Direction;
    point?: Point;
    stop?: boolean;
    checkCollision(nx: number, ny: number): boolean;
}

class GameObject implements IGameObject {
    x: number;
    y: number;
    collision?: GridPoint[];
    sprite: Sprite;
    isManagedByUser?: boolean;
    constructor(config: IGameObjectConfig) {
        [this.x, this.y] = [config.x || 1, config.y || 1];
        const spriteCfg = config.spriteCfg || {};
        this.collision = config.collision;
        this.isManagedByUser = config.isManagedByUser;
        this.sprite = new Sprite({
            gameObject: this,
            // animations: {},
            src: config.src,
            sx: 32,
            sy: 32,
            ...spriteCfg
        });
    }
    update(_updates: IUpdatesPayload) { }
    drawCollision(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {
        if (this.collision) {
            ctx.strokeStyle = 'grey';
            const deltaX = cameraPosition[0] - fromGrid(9);
            const deltaY = cameraPosition[1] - fromGrid(5);

            const gx = toGrid(this.x);
            const gy = toGrid(this.y);
            this.collision.forEach(([cw, ch]) => {
                ctx.strokeRect(
                    (gx + cw) * CELL_SIZE - deltaX, (gy + ch) * CELL_SIZE - deltaY,
                    CELL_SIZE, CELL_SIZE,
                );
            })
        }
    }
    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint): void {
        this.sprite.draw(ctx, cameraPosition);
        this.drawCollision(ctx, cameraPosition);
    }
}

export default GameObject;