import { AiChatController } from '../../controller';

interface ChatAgentSettingProps {
    /**
     * 聊天控制器
     */
    controller: AiChatController;
    /**
     * 类名
     */
    className?: string;
}
export declare const ChatAgentSetting: (props: ChatAgentSettingProps) => import("preact").JSX.Element;
export {};
