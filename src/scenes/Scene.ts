import { CELL_SIZE, fromGrid, GridPoint, toGrid } from "@/helpers/grid";
import { IDirectionInput } from "@/inputs/IDirectionInput";
import { IMouseInput } from "@/inputs/IMouseInput";
import GameObject from "@/objects/GameObject";
import Overworld from "@/overworld/Overworld";
import getSkeleton from "@/characters/skeleton/skeletonFactory";
import getGravestone from "@/exteriors/tombs/gravestoneFactory";

class Scene {
    canvas: HTMLCanvasElement;
    container: HTMLDivElement;
    renderCtx: CanvasRenderingContext2D;
    width: number;
    height: number;
    overworld: Overworld;
    objects: GameObject[];
    assetObjects: GameObject[];
    directionInput: IDirectionInput;
    mousePointInput: IMouseInput;
    cameraPosition: GridPoint;
    constructor(config: any) {
        this.container = config.element;
        this.canvas = this.container.querySelector('canvas')!;
        this.width = 640;
        this.height = 360;
        this.renderCtx = this.canvas.getContext('2d')!;

        this.directionInput = new config.DirectionInput();
        this.mousePointInput = new config.MouseInput(this.canvas, { cellSize: CELL_SIZE });

        this.overworld = new Overworld();

        const hero = getSkeleton({ x: fromGrid(3), y: fromGrid(8), isManagedByUser: true });

        this.cameraPosition = [hero.x, hero.y];

        this.objects = [
            // hero
            hero,
            // npc1
            getSkeleton({ x: fromGrid(12), y: fromGrid(3) }),

            // gravestone1
            getGravestone({ x: fromGrid(10), y: fromGrid(9) })
        ];

        this.assetObjects = [];
    }

    private drawStones() {
        this.assetObjects.forEach(t => t.draw(this.renderCtx, this.cameraPosition))
    }

    private drawCharacters() {
        this.objects
            .sort((a, b) => a.y === b.y ? a.isManagedByUser ? 1 : -1 : a.y > b.y ? 1 : -1)
            .forEach(t => {
                if (t.isManagedByUser) {
                    t.update({
                        move: this.directionInput.direction,
                        point: this.mousePointInput.point,
                        // we should bound 
                        checkCollision: (nx, ny) => {
                            if (!t.collision) return false;
                            return !!t.collision.find(([cw, ch]) => {
                                const objCollision = !!this.objects.find(obj => {

                                    const objNx = toGrid(obj.x);
                                    const objNy = toGrid(obj.y);
                                    return !obj.isManagedByUser && obj.collision && obj.collision.find(([objCw, objCh]) => {
                                        return (nx + cw === objNx + objCw) && (ny + ch === objNy + objCh);
                                    })
                                });
                                if (objCollision) return true;
                                const res = this.overworld.checkCollision(nx + cw, ny + ch);
                                return res;
                            });
                        }
                    });
                    this.cameraPosition = [t.x, t.y];
                }
                t.draw(this.renderCtx, this.cameraPosition)
            });
    }

    private drawHud() {
        if (this.mousePointInput.point) {
            this.renderCtx.font = '18px Inter, Avenir';
            this.renderCtx.fillStyle = 'yellow';
            const nx = this.mousePointInput.point[0] + toGrid(this.cameraPosition[0]) - 9;
            const ny = this.mousePointInput.point[1] + toGrid(this.cameraPosition[1]) - 5;
            this.renderCtx.fillText(
                `${nx}, ${ny}`,
                fromGrid(0) + 2, fromGrid(0) + 18
            );
        }
    }

    private run() {
        this.draw();
        requestAnimationFrame(() => {
            this.run();
        })
    }

    init() {
        this.directionInput.init();
        this.mousePointInput.init();
        this.run();
    }

    private draw() {
        // draw overworld lower
        this.overworld.update({ point: this.mousePointInput.point })
        this.overworld.draw(this.renderCtx, this.cameraPosition);

        this.drawHud();

        // draw assets
        this.drawStones();

        // draw objects
        this.drawCharacters();

        // draw overworld upper
    }
}

export default Scene;