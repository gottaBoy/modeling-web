import { IChatMessage } from '../../../interface';

export interface UnknownMessageProps {
    message: IChatMessage;
    /**
     * 内容大小，用于更新绘制
     *
     * @author chitanda
     * @date 2023-10-15 21:10:22
     * @type {number}
     */
    size: number;
}
export declare const UnknownMessage: (props: UnknownMessageProps) => import("preact").JSX.Element;
