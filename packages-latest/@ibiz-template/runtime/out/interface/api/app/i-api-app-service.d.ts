import { IApplication } from '@ibiz/model-core';
import { IApiNet } from '@ibiz-template/core';
import { IApiCodeListService, IApiDEServiceUtil } from '../service';
/**
 * @description 应用服务接口
 * @export
 * @interface IApiAppService
 */
export interface IApiAppService {
    /**
     * @description 当前应用标识(带系统标识)
     * @type {string}
     * @memberof IApiAppService
     */
    readonly appId: string;
    /**
     * @description 当前应用标识(仅标识)
     * @type {string}
     * @memberof IApiAppService
     */
    readonly id: string;
    /**
     * @description 应用模型
     * @type {IApplication}
     * @memberof IApiAppService
     */
    readonly model: IApplication;
    /**
     * @description 请求服务,单应用环境请求使用ibiz.net；多应用环境请求优先用 app.net 自动补应用路由前缀
     * @type {IApiNet}
     * @memberof IApiAppService
     */
    readonly net: IApiNet;
    /**
     * @description 实体服务工具类
     * @type {IApiDEServiceUtil}
     * @memberof IApiAppService
     */
    readonly deService: IApiDEServiceUtil;
    /**
     * @description 代码表服务
     * @type {IApiCodeListService}
     * @memberof IApiAppService
     */
    readonly codeList: IApiCodeListService;
    /**
     * @description 销毁应用
     * @memberof IApiAppService
     */
    destroy(): void;
}
//# sourceMappingURL=i-api-app-service.d.ts.map