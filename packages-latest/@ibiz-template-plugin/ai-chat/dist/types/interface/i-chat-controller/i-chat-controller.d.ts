import { AiChatController } from '../../controller';
import { ChatTopic } from '../../entity';
import { IContainerOptions } from '../i-container-options/i-container-options';

/**
 * @description 聊天总控制器接口
 * @author tony001
 * @date 2026-05-15 13:05:54
 * @export
 * @interface IChatController
 */
export interface IChatController {
    /**
     * @description 创建聊天窗口(会同时显示出来)
     * @author tony001
     * @date 2026-05-15 14:05:07
     * @param {IContainerOptions} opts
     * @returns {*}  {Promise<AiChatController>}
     * @memberof IChatController
     */
    create(opts: IContainerOptions): Promise<AiChatController>;
    /**
     * @description 切换聊天控制器
     * @author tony001
     * @date 2026-05-15 14:05:37
     * @param {ChatTopic} topic
     * @memberof IChatController
     */
    switchAiChatController(topic: ChatTopic): void;
}
