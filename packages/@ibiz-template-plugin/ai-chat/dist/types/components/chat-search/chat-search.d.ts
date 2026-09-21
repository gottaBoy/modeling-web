export interface ChatSearchProps {
    /**
     * 值
     *
     * @type {string}
     * @memberof ChatSearchProps
     */
    value: string | undefined;
    /**
     * 类名
     *
     * @type {string}
     * @memberof ChatSearchProps
     */
    className?: string;
    /**
     * 空白占位
     *
     * @type {string}
     * @memberof ChatSearchProps
     */
    placeholder?: string;
    /**
     * 点击事件
     *
     * @memberof ChatSearchProps
     */
    onChange?: (value: string) => void;
}
export declare const ChatSearch: (props: ChatSearchProps) => import("preact").JSX.Element;
