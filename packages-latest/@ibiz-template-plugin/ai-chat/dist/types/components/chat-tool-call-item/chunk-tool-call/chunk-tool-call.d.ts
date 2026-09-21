import { IChatToolCall } from '../../../interface';
import { AiChatController } from '../../../controller';

export interface ChunkToolCallProps {
    item: IChatToolCall;
    controller: AiChatController;
    className?: string;
    onLinkClick: (event: MouseEvent) => void;
    onCollapseChange?: (isCollapse: boolean) => void;
}
export declare const ChunkToolCall: (props: ChunkToolCallProps) => import("preact").JSX.Element;
