export class MarkOpenDataService {
    constructor() {
        /**
         * 回调集合
         * @author lxm
         * @date 2024-02-01 04:41:45
         */
        this.callbackMap = new Map();
        /**
         * 基础路径
         * @author lxm
         * @date 2024-01-23 02:06:47
         */
        this.baseUrl = '/portal/markopendata';
        ibiz.mc.command.markOpenData.on(msg => {
            const data = msg.data;
            const { entity, key } = data;
            const tag = `${entity}_${key}`;
            if (this.callbackMap.has(tag)) {
                this.callbackMap.get(tag).forEach(cb => cb(data));
            }
        });
    }
    /**
     * 获取站内信的集合
     * @author lxm
     * @date 2023-11-15 10:55:25
     * @param {IParams} [params={}]
     * @return {*}  {Promise<IHttpResponse>}
     */
    async action(deName, key, action) {
        const res = await ibiz.net.get(`${this.baseUrl}/${deName}/${key}/${action}`);
        return res;
    }
    /**
     * 发送系统消息
     * @param name
     * @param key
     * @param action
     * @param data
     * @return {*}  {Promise<IHttpResponse>}
     */
    async send(name, key, action, data) {
        const res = await ibiz.net.post(`${this.baseUrl}/${name}/${key}/${action}`, data);
        return res;
    }
    /**
     * 监听指定实体指定主键的消息
     * @author lxm
     * @date 2024-02-01 04:45:31
     * @param {string} deName
     * @param {string} key
     * @param {MarkOpenDataCallbackFun} callback
     */
    subscribe(deName, key, callback) {
        const tag = `${deName}_${key}`;
        const callbacks = this.callbackMap.get(tag) || [];
        callbacks.push(callback);
        this.callbackMap.set(tag, callbacks);
    }
    /**
     * 取消监听指定实体指定主键的消息
     * @author lxm
     * @date 2024-02-01 04:48:19
     * @param {string} deName
     * @param {string} key
     * @param {MarkOpenDataCallbackFun} callback
     */
    unsubscribe(deName, key, callback) {
        const tag = `${deName}_${key}`;
        const callbacks = this.callbackMap.get(tag) || [];
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
            this.callbackMap.set(tag, callbacks);
        }
    }
}
