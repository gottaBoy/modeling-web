import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import { MethodDto } from '../../../dto/method.dto';
import { IAppDEService, IDataEntity } from '../../../../interface';
/**
 * 应用实体方法输出转换
 *
 * @author chitanda
 * @date 2022-10-10 11:10:58
 * @export
 * @class MethodReturn
 */
export declare class MethodReturn {
    protected service: IAppDEService;
    protected entity: IAppDataEntity;
    protected method: IAppDEMethod;
    protected isLocalMode: boolean;
    protected dto?: MethodDto;
    /**
     * Creates an instance of MethodReturn.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:24
     * @param {IAppDEService} service
     * @param {IAppDataEntity} entity
     * @param {IAppDEMethod} method
     * @param {boolean} [isLocalMode=false]
     */
    constructor(service: IAppDEService, entity: IAppDataEntity, method: IAppDEMethod, isLocalMode?: boolean);
    /**
     * 处理请求返回参数
     *
     * @author chitanda
     * @date 2022-10-19 21:10:06
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IDataEntity>}
     */
    handle(context: IContext, data: IData): Promise<IDataEntity>;
    /**
     * 格式化
     *
     * @author tony001
     * @date 2024-05-23 18:05:35
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    format(context: IContext, data: IData): Promise<IData>;
}
//# sourceMappingURL=method-renturn.d.ts.map