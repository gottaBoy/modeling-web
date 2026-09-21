import { IChatStep } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatStepItemProps {
    element: IChatStep;
    onLinkClick: (event: MouseEvent) => void;
    controller: AiChatController;
}
export declare const ChatStepItem: (props: ChatStepItemProps) => import("preact").JSX.Element;
