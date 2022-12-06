import { IMouseInput } from "./IMouseInput";

class MouseInput implements IMouseInput {
    point: [number, number] | undefined;
    cellSize: number;
    constructor(private canvasElement: HTMLCanvasElement, options: any) {
        this.cellSize = options.cellSize || 32;
    }
    init() {
        this.canvasElement.addEventListener('mouseup', (e) => {
            const nx = Math.floor(e.offsetX / this.cellSize);
            const ny = Math.floor(e.offsetY / this.cellSize);
            this.point = [nx, ny];
        });
        this.canvasElement.addEventListener('mousemove', (e) => {
            const nx = Math.floor(e.offsetX / this.cellSize);
            const ny = Math.floor(e.offsetY / this.cellSize);
            this.point = [nx, ny];
        });
    }
}

export default MouseInput;