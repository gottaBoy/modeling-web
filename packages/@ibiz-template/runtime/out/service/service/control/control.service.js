import { clone } from '@ibiz-template/core';
import { ControlVO } from '../../vo/control.vo';
export class ControlService {
    /**
     * Creates an instance of ControlService.
     * @author lxm
     * @date 2022-08-29 18:08:08
     * @param {T} model
     */
    constructor(model) {
        /**
         * UI数据和实体数据的属性名映射
         * key：UI数据属性名
         * value: 映射属性描述信息
         *
         * @author lxm
         * @date 2022-08-31 17:08:35
         */
        this.dataUIMap = new Map();
        this.model = model;
    }
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    async init(_context) {
        this.app = ibiz.hub.getApp(this.model.appId);
        this.initUIDataMap();
    }
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    initUIDataMap() { }
    /**
     * 执行服务方法
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {string} methodName 方法名
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数或数据
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async exec(methodName, context, data, params) {
        const header = this.handleCustomRequestHeader();
        const res = await this.app.deService.exec(this.model.appDataEntityId, methodName, context, data, params, header);
        await this.handleItemPrivilege(res.data, context);
        return res;
    }
    /**
     * 处理启用项权限标识
     *
     * @protected
     * @param {IData} data 实体数据
     * @param {IContext} context 上下文
     * @memberof ControlService
     */
    async handleItemPrivilege(data, context) {
        const { enableItemPrivilege, appDataEntityId } = this.model;
        if (data && enableItemPrivilege && appDataEntityId) {
            const deAuthority = await this.app.authority.getService(appDataEntityId);
            const items = Array.isArray(data) ? data : [data];
            items.forEach(item => {
                deAuthority.setDataAccAction({ srfkey: item.srfkey, srfsessionid: context.srfsessionid }, item.srfdataaccaction);
            });
        }
    }
    /**
     * 处理自定义请求头
     *
     * @author zk
     * @date 2024-02-02 11:02:55
     * @memberof ControlService
     */
    handleCustomRequestHeader() {
        const customHeader = {};
        const { enableItemPrivilege } = this.model;
        if (enableItemPrivilege) {
            Object.assign(customHeader, { srfdataaccaction: true });
        }
        return customHeader;
    }
    /**
     * 处理响应
     *
     * @author lxm
     * @date 2022-08-31 17:08:13
     * @param {IHttpResponse} res
     * @returns {*}  {IHttpResponse}
     */
    handleResponse(res) {
        // 公共处理
        return clone(res);
    }
    /**
     * 实体数据转ui数据
     *
     * @author lxm
     * @date 2022-08-31 17:08:15
     * @param {IData} entityData  实体数据
     * @returns {*}  {IData}
     */
    toUIData(entityData) {
        return new ControlVO(entityData, clone(this.dataUIMap));
    }
}
