import { AiChatController } from '../../controller';
export interface ChatInputMaterialProps {
    /**
     * 聊天实例
     *
     * @author tony001
     * @date 2025-02-27 17:02:50
     * @type {AiChatController}
     */
    controller: AiChatController;
}
export declare const ChatInputMaterial: (props: ChatInputMaterialProps) => import("preact").JSX.Element;
