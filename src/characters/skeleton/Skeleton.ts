import { fromGrid, CELL_SIZE, toGrid, GridPoint } from "@/helpers/grid";
import { Direction } from "@/inputs/IDirectionInput";
import GameObject, { IUpdatesPayload } from "@/objects/GameObject";
import { IGameObject, IGameObjectConfig } from "@/objects/IGameObject";
import { Animations } from "@/types/animations";

class Skeleton extends GameObject {

    static MOVING_PROCESS_LEFT_BEHIND_LIMIT = 16;
    static MAP_DIRECTION_ANIMATIONS: Record<Direction, Animations> = {
        'right': Animations.WalkRight,
        'left': Animations.WalkLeft,
        'down': Animations.WalkDown,
        'up': Animations.WalkUp,
    }
    static MAP_IDLE_ANIMATIONS: Record<Direction, Animations> = {
        'right': Animations.IdleRight,
        'left': Animations.IdleLeft,
        'down': Animations.IdleDown,
        'up': Animations.IdleUp,
    }

    movingProcessLeftBehind: number = Skeleton.MOVING_PROCESS_LEFT_BEHIND_LIMIT;
    directionUpdates: Record<Direction, [keyof Pick<IGameObject, 'x' | 'y'>, number]> = {
        'up': ['y', -1],
        'down': ['y', 1],
        'left': ['x', -1],
        'right': ['x', 1],
    };
    direction: Direction | undefined = 'up';

    constructor(props: IGameObjectConfig) {
        super(props);
    }

    updateAnimation(updates: IUpdatesPayload) {
        if (this.movingProcessLeftBehind > 0 && this.direction) {
            this.sprite.setAnimation(Skeleton.MAP_DIRECTION_ANIMATIONS[this.direction]);
            return;
        }
        if (this.movingProcessLeftBehind === 0 && !updates.move) {
            this.sprite.setAnimation(Skeleton.MAP_IDLE_ANIMATIONS[this.direction!]);
        }
    }

    private updatePosition(updates: IUpdatesPayload) {
        if (this.movingProcessLeftBehind > 0 && this.direction) {
            const [prop, changeVal] = this.directionUpdates[this.direction];
            const data = { x: this.x, y: this.y };
            data[prop] += changeVal * Skeleton.MOVING_PROCESS_LEFT_BEHIND_LIMIT;
            const tx = toGrid(data.x);
            const ty = toGrid(data.y);
            if (!updates.checkCollision(tx, ty)) this[prop] += changeVal;
            this.movingProcessLeftBehind -= 1;
        }
    }

    update(updates: IUpdatesPayload) {
        this.updateAnimation(updates);
        this.updatePosition(updates);
        if (this.movingProcessLeftBehind === 0 && updates.move) {
            this.movingProcessLeftBehind = Skeleton.MOVING_PROCESS_LEFT_BEHIND_LIMIT;
            this.direction = updates.move;
        }
    }

    private drawCellUnderFeet(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {
        const tx2 = toGrid(this.x - cameraPosition[0]);
        const ty2 = toGrid(this.y - cameraPosition[1]);

        ctx.fillStyle = 'rgba(255,0,0, 0.4)';
        ctx.lineWidth = 2;
        ctx.fillRect(
            tx2 * CELL_SIZE + 2, ty2 * CELL_SIZE + 2,
            CELL_SIZE - 2, CELL_SIZE - 2
        );

        // ctx.font = '18px Inter, Avenir';
        // ctx.fillStyle = 'white';
        // ctx.fillText(
        //     `${tx2}, ${ty2}`,
        //     fromGrid(0) + 2, fromGrid(2) + 18
        // );

    }

    private drawHudCoords(ctx: CanvasRenderingContext2D) {
        const tx = toGrid(this.x);
        const ty = toGrid(this.y);

        ctx.font = '18px Inter, Avenir';
        ctx.fillStyle = 'lime';

        ctx.fillText(
            `${tx}, ${ty}`,
            fromGrid(0) + 2, fromGrid(1) + 9
        );
    }

    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint): void {

        this.drawCellUnderFeet(ctx, cameraPosition);
        this.drawCollision(ctx, cameraPosition);
        this.sprite.draw(ctx, cameraPosition);

        if (!this.isManagedByUser) return;

        this.drawHudCoords(ctx);
    }

}

export default Skeleton;