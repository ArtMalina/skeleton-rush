import { GridPoint } from "@/helpers/grid";
import GameObject from "@/objects/GameObject";
import { IGameObjectConfig } from "@/objects/IGameObject";

class Gravestone extends GameObject {
    image: HTMLImageElement;
    isLoaded: boolean = false;

    constructor(props: IGameObjectConfig) {
        super(props);

        this.image = new Image();
        this.image.onload = () => {
            this.isLoaded = true;
        };
        this.image.src = props.src;

    }


    draw(ctx: CanvasRenderingContext2D, cameraPosition: GridPoint): void {
        this.drawCollision(ctx, cameraPosition);
        this.sprite.draw(ctx, cameraPosition);
    }

}

export default Gravestone;