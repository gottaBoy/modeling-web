import { IChatToolCall } from '../../../interface';
import { AiChatController } from '../../../controller';

export interface DefaultToolCallProps {
    item: IChatToolCall;
    controller: AiChatController;
    className?: string;
    onCollapseChange?: (isCollapse: boolean) => void;
}
export declare const DefaultToolCall: (props: DefaultToolCallProps) => import("preact").JSX.Element;
