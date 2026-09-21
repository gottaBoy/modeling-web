import { ChatTopic } from '../../entity';
import { AiTopicController } from '../../controller';
export interface ChatTopicItemProps {
    controller: AiTopicController;
    topic: ChatTopic;
    onClick: () => void;
    onAction: (action: string, event: MouseEvent) => void;
}
export declare const ChatTopicItem: (props: ChatTopicItemProps) => import("preact").JSX.Element;
