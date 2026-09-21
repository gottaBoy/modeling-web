import { MutableRef } from 'preact/hooks';

interface SliderButtonProps {
    /**
     * 值
     */
    value: number;
    /**
     * 最小值
     */
    min: number;
    /**
     * 最大值
     */
    max: number;
    /**
     * 步长
     */
    step: number;
    /**
     * 值改变
     * @param value
     * @returns
     */
    onChange: (value: number) => void;
}
export interface SliderButtonHandle {
    onButtonDown: (event: MouseEvent | TouchEvent) => void;
    setPosition: (value: number) => void;
    state: MutableRef<{
        dragging: boolean;
        startX: number;
        newPosition: number;
        startPosition: number;
    }>;
}
export declare const SliderButton: import('preact').FunctionalComponent<import('preact/compat').PropsWithoutRef<SliderButtonProps> & {
    ref?: import('preact').Ref<SliderButtonHandle> | undefined;
}>;
export {};
