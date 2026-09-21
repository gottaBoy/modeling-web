import { AiTopicController } from '../../controller';
export interface ChatTopicProps {
    /**
     * 话题控制器
     *
     * @author tony001
     * @date 2025-02-20 17:02:49
     * @type {AiTopicController}
     */
    controller: AiTopicController;
}
export declare const ChatTopics: (props: ChatTopicProps) => import("preact").JSX.Element;
