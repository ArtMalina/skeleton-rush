import mapSrc from '@/assets/maps/overworld.jpg';
import { fromGrid, GridPoint, toGrid, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '@/helpers/grid';
import BreakpointsMap from './BreakpointsMap';
import GridLayout from "./GridLayout";

export default class Overworld {
    grid: GridLayout;
    breakpointsMap: BreakpointsMap;
    constructor() {
        this.grid = new GridLayout();
        this.breakpointsMap = new BreakpointsMap({});
    }
    update(updates: { point: [number, number] | undefined }) {
        this.grid.update(updates);
    }
    checkCollision(nx: number, ny: number) {
        // TODO: we should do check func as sttic method (no this ctx matching)
        return this.breakpointsMap.checkCollision(nx, ny);
    }
    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {
        const mapBackgroundImage = new Image();
        mapBackgroundImage.onload = () => {
            const cameraDx = fromGrid(9) - cameraPosition[0];
            const cameraDy = fromGrid(5) - cameraPosition[1];

            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

            ctx.drawImage(
                mapBackgroundImage,
                cameraDx, cameraDy,
                // VIEWPORT_WIDTH, VIEWPORT_HEIGHT,
                // 0, 0,
                // VIEWPORT_WIDTH, VIEWPORT_HEIGHT,
            );


            ctx.fillStyle = 'white'
            ctx.fillText(`${cameraDx}:${cameraDy}`, 550, 80);
            ctx.fillText(`${toGrid(cameraDx)}:${toGrid(cameraDy)}`, 550, 100);
            ctx.stroke();
        };
        mapBackgroundImage.src = mapSrc;
        this.grid.draw(ctx, cameraPosition);
        this.breakpointsMap.draw(ctx, cameraPosition);
    }
}