import { IPortalMessage } from '@ibiz-template/core';
import { MqttClient, IClientOptions } from 'mqtt';
import { QXEvent } from 'qx-util';
/**
 * mqtt 连接服务
 *
 * @author chitanda
 * @date 2023-10-20 14:10:40
 * @export
 * @class MqttService
 */
export declare class MqttService {
    protected mqttTopic: string;
    protected token: string;
    protected appId: string;
    /**
     * 设定最大重连次数
     */
    MAX_RECONNECT_TIMES: number;
    /**
     * 重连次数
     */
    reconnectCount: number;
    /**
     * 接受消息通知
     *
     * @author chitanda
     * @date 2023-10-23 15:10:06
     */
    readonly evt: QXEvent<{
        message: (topic: string, msg: IPortalMessage) => void;
    }>;
    /**
     * mqtt 连接实例
     *
     * @author chitanda
     * @date 2023-10-20 20:10:44
     * @type {MqttClient}
     */
    client?: MqttClient;
    /**
     * mqtt all
     *
     * @type {string}
     * @memberof MqttService
     */
    mqttAllTopic: string;
    /**
     * 连接选项
     *
     * @author chitanda
     * @date 2023-10-20 14:10:25
     * @protected
     * @type {IClientOptions}
     */
    protected options: IClientOptions;
    /**
     * Creates an instance of MqttService.
     *
     * @author chitanda
     * @date 2023-10-23 15:10:06
     * @param {string} mqttTopic
     * @param {string} token
     * @param {string} appId
     */
    constructor(mqttTopic: string, token: string, appId: string);
    /**
     * 获取监听主题
     *
     * @author tony001
     * @date 2025-01-13 16:01:04
     * @private
     * @return {*}  {string[]}
     */
    private getSubscribeTopics;
    /**
     * 格式化mqt消息（转化为前端识别的消息）
     *
     * @author tony001
     * @date 2025-01-13 16:01:41
     * @private
     * @param {IPortalMessage} msg
     * @return {*}  {IPortalMessage}
     */
    private formatMessage;
    /**
     * mqtt 连接
     *
     * @author chitanda
     * @date 2023-10-23 15:10:58
     * @return {*}  {Promise<void>}
     */
    connect(): Promise<void>;
    /**
     * 结束 mqtt 连接
     *
     * @author chitanda
     * @date 2023-10-23 15:10:37
     */
    close(): void;
}
//# sourceMappingURL=mqtt.service.d.ts.map