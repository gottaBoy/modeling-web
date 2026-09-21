
export interface ChatImagePreviewProps {
    /**
     * @description 图片路径
     * @type {string}
     * @memberof ChatImagePreviewProps
     */
    src: string;
    /**
     * @description 关闭
     * @memberof ChatImagePreviewProps
     */
    onClose?: (e: MouseEvent) => void;
}
export declare const ChatImagePreview: (props: ChatImagePreviewProps) => import("preact").JSX.Element;
