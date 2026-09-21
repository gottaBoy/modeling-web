import { IAppDataEntity, IAppDEMethodDTO, IAppDEMethodDTOField } from '@ibiz/model-core';
import { IAppDEService, IAppService, IDataEntity } from '../../interface';
/**
 * 应用实体服务方法转换 DTO
 *
 * @author chitanda
 * @date 2022-10-10 22:10:52
 * @export
 * @class MethodDto
 */
export declare class MethodDto {
    protected service: IAppDEService;
    protected entity: IAppDataEntity;
    protected isLocalMode?: boolean | undefined;
    protected dto?: IAppDEMethodDTO | undefined;
    protected app?: IAppService;
    protected fields: IAppDEMethodDTOField[];
    protected dtoMap: Map<string, MethodDto>;
    /**
     * Creates an instance of MethodDto.
     * @author lxm
     * @date 2024-01-04 05:39:07
     * @param {IAppDEService} service
     * @param {IAppDataEntity} entity
     * @param {boolean} [isLocalMode]
     * @param {IAppDEMethodDTO} [dto]
     */
    constructor(service: IAppDEService, entity: IAppDataEntity, isLocalMode?: boolean | undefined, dto?: IAppDEMethodDTO | undefined);
    /**
     * 请求参数组合 DTO
     *
     * @author chitanda
     * @date 2022-10-10 23:10:33
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    get(context: IContext, data: IData, ignore?: boolean): Promise<IData>;
    /**
     * 设置本地 DTO 存储
     *
     * @author chitanda
     * @date 2022-10-10 23:10:50
     * @param {IContext} context
     * @param {IData[]} data
     * @return {*}  {Promise<IDataEntity[]>}
     */
    sets(context: IContext, data: IData[]): Promise<IDataEntity[]>;
    /**
     * 递归计算当前 DTO 相关实体的父关系配置
     *
     * @author chitanda
     * @date 2023-12-26 16:12:13
     * @param {IContext} context
     * @param {number} [depth=0] 递归层级，避免进入死循环。最大递归层级为 10
     * @return {*}  {Promise<void>}
     */
    calcRs(context: IContext, depth?: number): Promise<void>;
    /**
     * 格式化数据
     *
     * @author tony001
     * @date 2024-05-21 23:05:18
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {IData[]}
     */
    format(context: IContext, data: IData): IData;
    /**
     * 获取子属性 DTO
     *
     * @author chitanda
     * @date 2023-12-22 13:12:06
     * @protected
     * @param {IContext} context
     * @param {IAppDEMethodDTOField} field
     * @return {*}  {Promise<MethodDto>}
     */
    protected getFieldDto(context: IContext, field: IAppDEMethodDTOField): Promise<MethodDto>;
}
//# sourceMappingURL=method.dto.d.ts.map