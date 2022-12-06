import { CELL_SIZE, fromGrid, GridPoint } from "@/helpers/grid";
import { mapBreakpoints } from "./mapBreakpoints";

export default class BreakpointsMap {
    breakpoints: Array<{ area: Array<[number, number]>, name: string }> = mapBreakpoints;
    constructor(_config: any) {
        // config.mapBreakpoints
    }
    private init(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {

        const cameraDx = cameraPosition[0] - fromGrid(9);
        const cameraDy = cameraPosition[1] - fromGrid(5);

        this.breakpoints.forEach(({ area }) => {
            area.forEach(([nx, ny]) => {
                ctx.strokeStyle = 'rgba(255,0,0, 0.4)';
                ctx.lineWidth = 2;
                ctx.strokeRect(
                    nx * CELL_SIZE - cameraDx, ny * CELL_SIZE - cameraDy,
                    CELL_SIZE, CELL_SIZE
                );
            })
        })
    }
    checkCollision(nx: number, ny: number) {
        return this.breakpoints.findIndex(
            ({ area }) => area.findIndex(([px, py]) => px === nx && ny === py) > -1
        ) > -1;
    }
    update() { }
    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {
        this.init(ctx, cameraPosition);
    }
}