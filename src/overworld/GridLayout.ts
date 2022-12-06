import { CELL_SIZE, fromGrid, GridPoint } from "@/helpers/grid";

export default class GridLayout {
    cursorPoint: GridPoint | undefined;
    constructor() {
    }
    private initGrid(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {

        const deltaX = cameraPosition[0] - fromGrid(9);
        const deltaY = cameraPosition[1] - fromGrid(5);

        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 30; j++) {
                ctx.strokeStyle = 'rgba(255,255,255, 0.1)';
                ctx.lineWidth = 2;
                ctx.strokeRect(
                    i * CELL_SIZE - deltaX, j * CELL_SIZE - deltaY,
                    CELL_SIZE, CELL_SIZE
                );
            }
        }
    }
    update(updates: { point?: GridPoint }) {
        this.cursorPoint = updates.point;
    }
    private drawCursor(ctx: CanvasRenderingContext2D) {
        if (!this.cursorPoint) return;
        const [i, j] = this.cursorPoint;
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            i * CELL_SIZE + 2, j * CELL_SIZE + 2,
            CELL_SIZE - 4, CELL_SIZE - 4
        );

    }
    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {
        this.initGrid(ctx, cameraPosition);
        this.drawCursor(ctx);
    }
}