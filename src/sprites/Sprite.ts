import { CELL_SIZE, fromGrid, GridPoint } from "@/helpers/grid";
import { IGameObject } from "@/objects/IGameObject";
import { Animations, AnimationSet } from "@/types/animations";
import { ISpriteConfig } from "./ISpriteConfig";


class Sprite {
    image: HTMLImageElement;
    animations: AnimationSet;
    currentAnimation: Animations;
    currentAnimationFrame: number;
    gameObject: IGameObject;
    isLoaded = false;
    sx: number;
    sy: number;
    width: number;
    height: number
    dx: number;
    dy: number;
    animationFrameLimit: number;
    animationFrameProgrss: number;
    constructor(config: ISpriteConfig<IGameObject>) {

        this.gameObject = config.gameObject;

        this.width = config.width || CELL_SIZE;
        this.height = config.height || CELL_SIZE;

        this.sx = config.sx || CELL_SIZE;
        this.sy = config.sy || CELL_SIZE;

        this.dx = config.dx || 0;
        this.dy = config.dy || 0;

        this.image = new Image();
        this.image.onload = () => {
            this.isLoaded = true;
        };
        this.image.src = config.src;

        this.animations = config.animations ? {
            [Animations.None]: [
                [0, 0]
            ],
            ...config.animations,
        } : {
            [Animations.None]: [
                [0, 0]
            ],
        };

        this.currentAnimation = config.currentAnimation || Animations.None;
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 0;
        this.animationFrameProgrss = this.animationFrameLimit;

    }

    get frame() {
        return this.animations[this.currentAnimation]![this.currentAnimationFrame];
    }

    setAnimation(key: Animations) {
        if (key !== this.currentAnimation) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgrss = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        if (this.animationFrameProgrss > 0) {
            this.animationFrameProgrss -= 1;
            return;
        }
        this.animationFrameProgrss = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (!this.frame) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint) {
        if (this.isLoaded) {
            const camperDx = cameraPosition[0] - fromGrid(9);
            const camperDy = cameraPosition[1] - fromGrid(5);
            const frame = this.frame || [0, 0];
            const px = this.gameObject.x - this.dx - camperDx;
            const py = this.gameObject.y - this.dy - camperDy;
            ctx.drawImage(
                this.image,
                // crop x y
                this.sx * frame[0], this.sy * frame[1],
                // crop size (w, h)
                this.sx, this.sy,
                // position to draw
                px, py,
                // result sprite size
                this.width, this.height
            );
            this.updateAnimationProgress();
        }
    }
}

export default Sprite;