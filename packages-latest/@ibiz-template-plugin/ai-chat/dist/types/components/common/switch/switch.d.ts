
export interface SwitchProps {
    /**
     * 值
     *
     * @type {number}
     * @memberof SwitchProps
     */
    value?: 0 | 1;
    /**
     * 类名
     *
     * @type {string}
     * @memberof SwitchProps
     */
    className?: string;
    /**
     * 显示文本
     *
     * @type {boolean}
     * @memberof SwitchProps
     */
    showText?: boolean;
    /**
     * 值变更
     * @param value
     * @returns
     */
    onChange?: (value?: 0 | 1) => void;
}
export declare const Switch: (props: SwitchProps) => import("preact").JSX.Element;
