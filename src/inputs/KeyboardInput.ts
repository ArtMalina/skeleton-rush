import { Direction, IDirectionInput } from "./IDirectionInput";

class DirectionKeyboardInput implements IDirectionInput {
    heldDirections: Direction[] = [];
    private map: Record<string, 'up' | 'down' | 'left' | 'right'> = {
        'ArrowUp': 'up',
        'KeyW': 'up',
        'ArrowDown': 'down',
        'KeyS': 'down',
        'ArrowLeft': 'left',
        'KeyA': 'left',
        'ArrowRight': 'right',
        'KeyD': 'right',
    };

    get direction(): Direction {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener('keydown', (e) => {
            const direction = this.map[e.code];
            if (direction && !this.heldDirections.includes(direction)) {
                this.heldDirections.unshift(direction);
            }
        });
        document.addEventListener('keyup', (e) => {
            const direction = this.map[e.code];
            const index = this.heldDirections.indexOf(direction);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }
}

export default DirectionKeyboardInput;