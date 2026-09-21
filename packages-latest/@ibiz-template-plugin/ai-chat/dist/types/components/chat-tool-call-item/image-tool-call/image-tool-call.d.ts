import { IChatToolCall } from '../../../interface';
import { AiChatController } from '../../../controller';

export interface ImageToolCallProps {
    item: IChatToolCall;
    controller: AiChatController;
    className?: string;
    onCollapseChange?: (isCollapse: boolean) => void;
}
export declare const ImageToolCall: (props: ImageToolCallProps) => import("preact").JSX.Element;
