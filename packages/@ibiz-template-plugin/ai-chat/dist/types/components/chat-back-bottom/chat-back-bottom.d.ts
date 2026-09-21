export interface ChatBackBottomProps {
    /**
     * @description 右侧距离
     * @type {number}
     * @memberof ChatBackBottomProps
     */
    right: number;
    /**
     * @description 底部距离
     * @type {number}
     * @memberof ChatBackBottomProps
     */
    bottom: number;
    /**
     * @description 滚动目标
     * @type {string}
     * @memberof ChatBackBottomProps
     */
    target: string;
    /**
     * @description 滚动高度达到此参数值才出现
     * @type {number}
     * @memberof ChatBackBottomProps
     */
    visibilityHeight?: number;
    /**
     * 点击事件
     *
     * @memberof ChatBackBottomProps
     */
    onClick?: () => void;
}
export declare function throttle(fn: (...args: unknown[]) => void | Promise<void>, wait: number): (...args: unknown[]) => void;
export declare const ChatBackBottom: (props: ChatBackBottomProps) => import("preact").JSX.Element;
