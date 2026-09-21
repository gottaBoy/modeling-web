import { IChatToolbarItem } from '../../interface';
import { AiChatController } from '../ai-chat/ai-chat.controller';

export declare abstract class MaterialHelper {
    protected aiChat: AiChatController;
    constructor(aiChat: AiChatController);
    /**
     * 执行操作
     *
     * @author tony001
     * @date 2025-02-28 15:02:56
     * @abstract
     * @return {*}  {Promise<void>}
     */
    abstract excuteAction(event: MouseEvent, item?: IChatToolbarItem): Promise<void>;
}
