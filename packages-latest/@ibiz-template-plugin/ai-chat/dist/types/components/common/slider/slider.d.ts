
export interface SliderProps {
    /**
     * 步长
     * - 默认为1
     * @type {number}
     * @memberof SliderProps
     */
    step?: number;
    /**
     * 最小值
     * - 默认为0
     * @type {number}
     * @memberof SliderProps
     */
    min?: number;
    /**
     * 最大值
     * - 默认为100
     * @type {number}
     * @memberof SliderProps
     */
    max?: number;
    /**
     * 值
     * - 默认为0
     * @type {number}
     * @memberof SliderProps
     */
    value?: number;
    /**
     * 显示文本
     * - 默认为false
     * @type {boolean}
     * @memberof SliderProps
     */
    showText?: boolean;
    /**
     * 类名
     *
     * @type {string}
     * @memberof SliderProps
     */
    className?: string;
    /**
     * 值变更
     * @param value
     * @returns
     */
    onChange?: (value: number) => void;
}
export declare const Slider: (props: SliderProps) => import("preact").JSX.Element;
