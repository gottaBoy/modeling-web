import { IChat } from '../i-chat-options/i-chat-options';
import { IConfigService } from '../i-config-service/i-config-service';
/**
 * 话题数据
 *
 * @author tony001
 * @date 2025-02-23 17:02:34
 * @export
 * @interface ITopic
 */
export interface ITopic {
    /**
     * 应用标识
     *
     * @author tony001
     * @date 2025-02-20 18:02:07
     * @type {string}
     */
    appid: string;
    /**
     * 话题标识
     *
     * @author tony001
     * @date 2025-02-20 15:02:01
     * @type {string}
     */
    id: string;
    /**
     * 话题类型
     *
     * @author tony001
     * @date 2025-02-20 18:02:00
     * @type {string}
     */
    type: string;
    /**
     * 话题标题
     *
     * @author tony001
     * @date 2025-02-20 15:02:57
     * @type {string}
     */
    caption?: string;
    /**
     * 源话题标题
     *
     * @author tony001
     * @date 2025-03-18 19:03:21
     * @type {string}
     */
    sourceCaption?: string;
    /**
     * 话题主数据url，用于跳转主数据界面
     *
     * @author tony001
     * @date 2025-02-20 15:02:08
     * @type {string}
     */
    url?: string;
    /**
     * 上下文
     *
     * @author tony001
     * @date 2025-02-24 11:02:59
     * @type {IChat}
     */
    aiChat?: IChat;
}
/**
 * 话题参数
 *
 * @author tony001
 * @date 2025-02-20 15:02:46
 * @export
 * @interface ITopicOptions
 */
export interface ITopicOptions extends ITopic {
    /**
     * 删除之前
     *
     * @author tony001
     * @date 2025-03-23 10:03:29
     * @param {object} context
     * @param {object} params
     * @param {ITopic} data
     * @param {MouseEvent} [event]
     * @param {boolean} [isBatch]
     * @return {*}  {Promise<boolean>}
     */
    beforeDelete?(context: object, params: object, data: ITopic, event?: MouseEvent, isBatch?: boolean): Promise<boolean>;
    /**
     * 话题行为
     *
     * @author tony001
     * @date 2025-02-24 16:02:04
     * @param { string} action
     * @param {object} context
     * @param {object} params
     * @param {ITopic} data
     * @param {MouseEvent} event
     * @return {*}  {Promise<boolean>}
     */
    action?(action: string, context: object, params: object, data: ITopic, event: MouseEvent): Promise<boolean>;
    /**
     * 存储服务构造器
     *
     * @author tony001
     * @date 2025-02-23 16:02:46
     */
    configService: (appid: string, storageType: string, subType: string) => IConfigService;
}
