import { createUUID, QXEvent } from 'qx-util';
export class CollaborateService {
    /**
     * Creates an instance of CollaborateService.
     * @author tony001
     * @date 2024-08-06 11:08:59
     * @param {string} id
     * @param {string} mqttTopic
     * @param {string} token
     * @param {string} appId
     */
    constructor(id, mqttTopic, token, appId) {
        this.id = id;
        this.mqttTopic = mqttTopic;
        this.token = token;
        this.appId = appId;
        /**
         * 发送消息
         *
         * @author tony001
         * @date 2024-08-06 11:08:00
         * @protected
         */
        this.collaborateUrl = '/portal/collaborate';
        /**
         * 事件对象
         *
         * @author tony001
         * @date 2024-08-05 19:08:09
         */
        this.evt = new QXEvent();
        /**
         * 连接选项
         *
         * @author tony001
         * @date 2024-08-05 19:08:06
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
        this.options.username = mqttTopic;
        this.options.password = token;
        this.readyState = 0;
    }
    /**
     * 发送消息
     *
     * @author tony001
     * @date 2024-08-06 11:08:40
     * @param {(string | ArrayBufferLike | Blob | ArrayBufferView)} data
     */
    send(data) {
        ibiz.net.post(`${this.collaborateUrl}/ROOM/${this.id}`, { data });
    }
    /**
     * mqtt 连接
     *
     * @author tony001
     * @date 2024-08-05 19:08:17
     * @return {*}  {Promise<void>}
     */
    async connect() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const module = await import('mqtt/dist/mqtt.min');
        const mqtt = module.default ? module.default : module;
        const { location } = window;
        this.client = mqtt.connect(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}${ibiz.env.baseUrl}/${this.appId}${ibiz.env.mqttUrl}`, this.options);
        this.client.on('connect', () => {
            this.client.subscribe(this.mqttTopic);
            this.readyState = 1;
            this.evt.emit('connect');
            ibiz.log.debug('collaborate connect');
        });
        this.client.on('error', error => {
            this.readyState = 3;
            this.evt.emit('error', error);
            ibiz.log.debug('collaborate error');
        });
        this.client.on('message', (topic, payload) => {
            const message = JSON.parse(payload.toString());
            if (message &&
                message.data &&
                message.data.data &&
                message.data.data.data) {
                this.evt.emit('message', new Uint8Array(Object.values(message.data.data.data)));
            }
            ibiz.log.debug('collaborate message');
        });
        this.client.on('reconnect', () => {
            this.readyState = 0;
            this.evt.emit('reconnect');
        });
        this.client.on('close', () => {
            this.readyState = 3;
            this.evt.emit('close');
            ibiz.log.debug('collaborate close');
        });
    }
    /**
     * 结束 mqtt 连接
     *
     * @author tony001
     * @date 2024-08-05 19:08:02
     */
    close() {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.end();
        this.evt.reset();
    }
}
