import { h } from 'preact';
import { AiChatController } from '../../controller';
import { IMaterial } from '../../interface';
export interface ChatInputMaterialtemProps {
    /**
     * 聊天控制器
     *
     * @author tony001
     * @date 2025-02-28 15:02:04
     * @type {AiChatController}
     */
    controller: AiChatController;
    /**
     * 素材对象
     *
     * @author tony001
     * @date 2025-02-28 15:02:45
     * @type {IMaterial}
     */
    material: IMaterial;
    /**
     * 禁用状态
     *
     * @author tony001
     * @date 2025-03-03 14:03:26
     * @type {boolean}
     */
    disabled: boolean;
}
export declare const ChatInputMaterialtem: (props: ChatInputMaterialtemProps) => h.JSX.Element;
