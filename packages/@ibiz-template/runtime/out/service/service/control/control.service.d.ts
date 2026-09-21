import { IHttpResponse } from '@ibiz-template/core';
import { IAjaxControl } from '@ibiz/model-core';
import { ControlVO } from '../../vo/control.vo';
import { UIMapField } from '../../vo/ui-map-field';
import { IAppService } from '../../../interface';
export declare class ControlService<T extends IAjaxControl = IAjaxControl> {
    app: IAppService;
    /**
     * 部件模型
     *
     * @author lxm
     * @date 2022-08-29 18:08:10
     * @type {T}
     */
    readonly model: T;
    /**
     * UI数据和实体数据的属性名映射
     * key：UI数据属性名
     * value: 映射属性描述信息
     *
     * @author lxm
     * @date 2022-08-31 17:08:35
     */
    dataUIMap: Map<string, UIMapField>;
    /**
     * Creates an instance of ControlService.
     * @author lxm
     * @date 2022-08-29 18:08:08
     * @param {T} model
     */
    constructor(model: T);
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    init(_context?: IContext): Promise<void>;
    /**
     * 初始化属性映射
     *
     * @author lxm
     * @date 2022-08-31 18:08:37
     */
    protected initUIDataMap(): void;
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
    exec(methodName: string, context: IContext, data?: IData, params?: IParams): Promise<IHttpResponse>;
    /**
     * 处理启用项权限标识
     *
     * @protected
     * @param {IData} data 实体数据
     * @param {IContext} context 上下文
     * @memberof ControlService
     */
    protected handleItemPrivilege(data: IData | IData[], context: IContext): Promise<void>;
    /**
     * 处理自定义请求头
     *
     * @author zk
     * @date 2024-02-02 11:02:55
     * @memberof ControlService
     */
    protected handleCustomRequestHeader(): IData;
    /**
     * 处理响应
     *
     * @author lxm
     * @date 2022-08-31 17:08:13
     * @param {IHttpResponse} res
     * @returns {*}  {IHttpResponse}
     */
    handleResponse(res: IHttpResponse): IHttpResponse;
    /**
     * 实体数据转ui数据
     *
     * @author lxm
     * @date 2022-08-31 17:08:15
     * @param {IData} entityData  实体数据
     * @returns {*}  {IData}
     */
    toUIData(entityData: IData): ControlVO;
}
//# sourceMappingURL=control.service.d.ts.map