import { Animations, AnimationSet } from "@/types/animations";

export interface ISpriteConfig<T> {
    width?: number;
    height?: number;
    sx?: number;
    sy?: number;
    // offset of image sprite (specific of sprite source)
    dx?: number;
    dy?: number;
    src: string;
    animations?: AnimationSet;
    currentAnimation?: Animations;
    animationFrameLimit?: number;
    gameObject: T;
}