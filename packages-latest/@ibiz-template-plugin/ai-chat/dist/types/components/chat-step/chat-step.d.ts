import { IChatStep } from '../../interface';
import { AiChatController } from '../../controller';

export interface ChatStepProps {
    items: IChatStep[];
    onLinkClick: (event: MouseEvent) => void;
    controller: AiChatController;
}
export declare const ChatStep: (props: ChatStepProps) => import("preact").JSX.Element;
