/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from '@ibiz-template/core';
// import { WebsocketProvider } from '@ibiz-template-plugin/collaborate-provider';
import { CollaborateService } from '../../service';
/**
 * 协同房间
 *
 * @author tony001
 * @date 2024-08-05 18:08:56
 * @export
 * @class CollaborateRoom
 */
export class CollaborateRoom {
    /**
     * Creates an instance of CollaborateRoom.
     * @author tony001
     * @date 2024-08-05 18:08:36
     * @param {string} id
     * @param {IData} doc
     */
    constructor(context, params, id, doc) {
        this.context = context;
        this.params = params;
        this.id = id;
        this.doc = doc;
        const mqttTopicids = ibiz.appData.mqtttopic.split('/');
        this.name = `/${mqttTopicids[1]}/collaborate/ROOM/${this.id}`;
    }
    /**
     * 创建当前实例
     *
     * @author tony001
     * @date 2024-08-06 10:08:20
     * @return {*}  {Promise<void>}
     */
    async created() {
        const app = ibiz.hub.getApp(this.context.srfappid);
        const appId = app.model.appId || ibiz.env.appId;
        // const serviceUrl = `ws://${window.location.host}${ibiz.env.baseUrl}/${appId}${ibiz.env.mqttUrl}`;
        const collaborate = new CollaborateService(this.id, this.name, getToken(), appId);
        await collaborate.connect();
        // this.connectionProvider = new WebsocketProvider(
        //   serviceUrl,
        //   this.name,
        //   this.doc as any,
        //   { WebSocketPolyfill: collaborate as any },
        // );
    }
    /**
     * 销毁当前实例
     *
     * @author tony001
     * @date 2024-08-06 10:08:08
     * @return {*}  {Promise<void>}
     */
    async destroy() {
        if (this.connectionProvider) {
            this.connectionProvider.close();
        }
    }
}
