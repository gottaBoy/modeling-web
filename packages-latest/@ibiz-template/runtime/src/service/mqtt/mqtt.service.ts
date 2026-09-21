/* eslint-disable no-useless-escape */
import { IPortalMessage } from '@ibiz-template/core';
import { clone } from 'lodash-es';
import { MqttClient, IClientOptions } from 'mqtt';
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
   * 设定最大重连次数
   */
  MAX_RECONNECT_TIMES = 3;

  /**
   * 重连次数
   */
  reconnectCount = 0;

  /**
   * 接受消息通知
   *
   * @author chitanda
   * @date 2023-10-23 15:10:06
   */
  readonly evt: QXEvent<{
    message: (topic: string, msg: IPortalMessage) => void;
  }> = new QXEvent();

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
  protected options: IClientOptions = {
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

  /**
   * Creates an instance of MqttService.
   *
   * @author chitanda
   * @date 2023-10-23 15:10:06
   * @param {string} mqttTopic
   * @param {string} token
   * @param {string} appId
   */
  constructor(
    protected mqttTopic: string,
    protected token: string,
    protected appId: string,
  ) {
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
  private getSubscribeTopics(): string[] {
    const topics: string[] = [this.mqttAllTopic, this.mqttTopic];
    const extMqttTopics = ibiz.appData?.extmqtttopic;
    if (extMqttTopics && Object.keys(extMqttTopics).length > 0) {
      Object.keys(extMqttTopics).forEach(key => {
        const value = extMqttTopics[key];
        if (value) topics.push(value);
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
  private formatMessage(mqttMsg: IPortalMessage): IPortalMessage {
    const msg = {
      ...mqttMsg,
    };
    const { type, subtype, content } = msg;
    // 格式化服务传递过来消息（type为COMMAND，子类型为OBJECTCREATED|OBJECTUPDATED）
    if (
      type === 'COMMAND' &&
      (subtype === 'OBJECTCREATED' || subtype === 'OBJECTUPDATED') &&
      content &&
      Object.prototype.toString.call(content) === '[object Object]' &&
      (content as unknown as IData).srfdename
    ) {
      msg.data = clone(content as unknown as IData);
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
  async connect(): Promise<void> {
    this.reconnectCount = 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const module = await import('mqtt/dist/mqtt.min');
    const mqtt = module.default ? module.default : module;
    const { location } = window;
    this.client = mqtt.connect(
      `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}${ibiz.env.baseUrl}/${this.appId}${ibiz.env.mqttUrl}`,
      this.options,
    ) as MqttClient;
    this.client.on('connect', () => {
      const topics = this.getSubscribeTopics();
      this.client!.subscribe(topics);
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
      ibiz.log.warn('mqtt reconnect');
      this.reconnectCount += 1;
      if (this.reconnectCount >= this.MAX_RECONNECT_TIMES) {
        this.client?.end(true);
        ibiz.log.warn(
          `the maximum number of reconnection attempts has been reached (${this.MAX_RECONNECT_TIMES}), and reconnection will be stopped.`,
        );
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
  close(): void {
    this.client?.end();
    this.evt.reset();
  }
}
