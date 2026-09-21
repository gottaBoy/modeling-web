import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import { MethodDto } from '../../../dto/method.dto';
import { IAppDEService } from '../../../../interface';
/**
 * 应用实体方法输入转换
 *
 * @author chitanda
 * @date 2022-10-10 11:10:36
 * @export
 * @class MethodInput
 */
export declare class MethodInput {
    protected service: IAppDEService;
    protected entity: IAppDataEntity;
    protected method: IAppDEMethod;
    protected isLocalMode: boolean;
    protected dto?: MethodDto;
    /**
     * Creates an instance of MethodInput.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:57
     * @param {IAppDEService} service
     * @param {IAppDataEntity} entity
     * @param {IAppDEMethod} method
     * @param {boolean} [isLocalMode=false]
     */
    constructor(service: IAppDEService, entity: IAppDataEntity, method: IAppDEMethod, isLocalMode?: boolean);
    /**
     * 处理请求发送参数
     *
     * @author chitanda
     * @date 2022-10-11 14:10:22
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    handle(context: IContext, data: IData): Promise<IData>;
    /**
     * 格式化
     *
     * @author tony001
     * @date 2024-05-21 23:05:38
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    format(context: IContext, data: IData): Promise<IData>;
}
//# sourceMappingURL=method-input.d.ts.map