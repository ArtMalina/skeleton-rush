export const enum Animations {
    None = 'none',

    IdleDown = 'idleDown',
    IdleUp = 'idleUp',
    IdleLeft = 'idleLeft',
    IdleRight = 'idleRight',

    WalkDown = 'walkDown',
    WalkUp = 'walkUp',
    WalkLeft = 'walkLeft',
    WalkRight = 'walkRight',
}

export type AnimationFrameID = number;
// export type AnimationFrameID = number & { __TYPE__: "AnimationFrameID" };

export type AnimationFrame = [AnimationFrameID, AnimationFrameID];

// type PartialWithDefault<T, D> = { [P in keyof T]: P extends D ? T[P] : T[P] | undefined; }

export type AnimationSet = Partial<Record<Animations, AnimationFrame[]>>;