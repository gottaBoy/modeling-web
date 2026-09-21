import { clone } from 'lodash-es';
import { QXEvent, createUUID } from 'qx-util';
/**
 * mqtt 连接服务
 *
 * @author chitanda
 * @date 2023-10-20 14:10:40
 * @export
 * @class MqttService
 */
export class MqttService {
    /**
     * Creates an instance of MqttService.
     *
     * @author chitanda
     * @date 2023-10-23 15:10:06
     * @param {string} mqttTopic
     * @param {string} token
     * @param {string} appId
     */
    constructor(mqttTopic, token, appId) {
        this.mqttTopic = mqttTopic;
        this.token = token;
        this.appId = appId;
        /**
         * 设定最大重连次数
         */
        this.MAX_RECONNECT_TIMES = 3;
        /**
         * 重连次数
         */
        this.reconnectCount = 0;
        /**
         * 接受消息通知
         *
         * @author chitanda
         * @date 2023-10-23 15:10:06
         */
        this.evt = new QXEvent();
        /**
         * 连接选项
         *
         * @author chitanda
         * @date 2023-10-20 14:10:25
         * @protected
         * @type {IClientOptions}
         */
        this.options = {
            // 超时时间
            connectTimeout: 6000,
            // 认证信息
            clientId: createUUID(),
            username: '',
            password: '',
            // 心跳时间
            keepalive: 60,
            clean: true,
        };
        this.mqttAllTopic = mqttTopic.replace(/\/([^\/]+)$/, '/all');
        this.options.username = mqttTopic;
        this.options.password = token;
    }
    /**
     * 获取监听主题
     *
     * @author tony001
     * @date 2025-01-13 16:01:04
     * @private
     * @return {*}  {string[]}
     */
    getSubscribeTopics() {
        var _a;
        const topics = [this.mqttAllTopic, this.mqttTopic];
        const extMqttTopics = (_a = ibiz.appData) === null || _a === void 0 ? void 0 : _a.extmqtttopic;
        if (extMqttTopics && Object.keys(extMqttTopics).length > 0) {
            Object.keys(extMqttTopics).forEach(key => {
                const value = extMqttTopics[key];
                if (value)
                    topics.push(value);
            });
        }
        ibiz.log.debug('mqtt subscribe topics', topics);
        return topics;
    }
    /**
     * 格式化mqt消息（转化为前端识别的消息）
     *
     * @author tony001
     * @date 2025-01-13 16:01:41
     * @private
     * @param {IPortalMessage} msg
     * @return {*}  {IPortalMessage}
     */
    formatMessage(mqttMsg) {
        const msg = Object.assign({}, mqttMsg);
        const { type, subtype, content } = msg;
        // 格式化服务传递过来消息（type为COMMAND，子类型为OBJECTCREATED|OBJECTUPDATED）
        if (type === 'COMMAND' &&
            (subtype === 'OBJECTCREATED' || subtype === 'OBJECTUPDATED') &&
            content &&
            Object.prototype.toString.call(content) === '[object Object]' &&
            content.srfdename) {
            msg.data = clone(content);
        }
        return msg;
    }
    /**
     * mqtt 连接
     *
     * @author chitanda
     * @date 2023-10-23 15:10:58
     * @return {*}  {Promise<void>}
     */
    async connect() {
        this.reconnectCount = 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const module = await import('mqtt/dist/mqtt.min');
        const mqtt = module.default ? module.default : module;
        const { location } = window;
        this.client = mqtt.connect(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}${ibiz.env.baseUrl}/${this.appId}${ibiz.env.mqttUrl}`, this.options);
        this.client.on('connect', () => {
            const topics = this.getSubscribeTopics();
            this.client.subscribe(topics);
            ibiz.log.debug('mqtt connect');
        });
        this.client.on('error', error => {
            ibiz.log.error('mqtt error', error);
        });
        this.client.on('message', (topic, payload) => {
            ibiz.log.debug('mqtt message', topic, payload.toString());
            const msg = this.formatMessage(JSON.parse(payload.toString()));
            this.evt.emit('message', topic, msg);
        });
        this.client.on('reconnect', () => {
            var _a;
            ibiz.log.warn('mqtt reconnect');
            this.reconnectCount += 1;
            if (this.reconnectCount >= this.MAX_RECONNECT_TIMES) {
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.end(true);
                ibiz.log.warn(`the maximum number of reconnection attempts has been reached (${this.MAX_RECONNECT_TIMES}), and reconnection will be stopped.`);
            }
        });
        this.client.on('close', () => {
            ibiz.log.warn('mqtt close');
        });
    }
    /**
     * 结束 mqtt 连接
     *
     * @author chitanda
     * @date 2023-10-23 15:10:37
     */
    close() {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.end();
        this.evt.reset();
    }
}
