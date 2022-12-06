import DirectionKeyboardInput from "@/inputs/KeyboardInput";
import MouseInput from "@/inputs/MouseInput";
import Scene from "@/scenes/Scene";

export function setupScene(element: HTMLDivElement, reactive: any) {
    let isDisplayed = false;
    const initCanvas = () => {

        const scene = new Scene({
            element,
            // we could define here the game controller (not yet)
            DirectionInput: DirectionKeyboardInput,
            MouseInput: MouseInput
        });
        scene.init();
    };
    reactive.track((message: string) => {
        if (message === 'launch' && !isDisplayed) {
            isDisplayed = true;
            // initCanvas();
        }
    }, 'canvas');
    initCanvas();
}