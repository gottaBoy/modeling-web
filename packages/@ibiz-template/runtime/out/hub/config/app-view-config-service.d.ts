import { IAppView } from '@ibiz/model-core';
import { IAppViewConfigService, IViewConfig } from '../../interface';
/**
 * 应用视图配置服务
 *
 * @author chitanda
 * @date 2023-12-21 16:12:06
 * @export
 * @class AppViewConfigService
 * @implements {IAppViewConfigService}
 */
export declare class AppViewConfigService implements IAppViewConfigService {
    /**
     * 视图配置信息集合
     * @author lxm
     * @date 2023-07-03 07:08:33
     */
    protected viewConfigs: Map<string, IViewConfig>;
    /**
     * 计算应用视图 标识
     *
     * @author chitanda
     * @date 2023-04-20 18:04:48
     * @protected
     * @param {string} tag
     * @return {*}  {string}
     */
    protected calcAppViewId(tag?: string): string;
    /**
     * 获取视图自定义Option
     *
     * @author zk
     * @date 2024-01-31 11:01:20
     * @protected
     * @param {IAppView} model
     * @return {*}  {IData}
     * @memberof AppViewConfigService
     */
    protected getCustomOption(model: IAppView): {
        modalOption: IData;
    };
    has(key: string): boolean;
    set(key: string, viewConfig: IViewConfig): void;
    get(key: string): Promise<IViewConfig>;
    getSync(key: string): IViewConfig | null;
}
//# sourceMappingURL=app-view-config-service.d.ts.map