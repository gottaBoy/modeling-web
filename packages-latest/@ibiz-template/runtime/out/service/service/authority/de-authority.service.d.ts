import { IAppDataEntity } from '@ibiz/model-core';
import { IAppDeAuthorityService } from '../../../interface';
export declare class DeAuthorityService implements IAppDeAuthorityService {
    protected entityModel: IAppDataEntity;
    constructor(entityModel: IAppDataEntity);
    /**
     * 数据权限MAP
     *
     * @protected
     * @type {Map<string, string>}
     * @memberof DeAuthorityService
     */
    protected dataAccActionMap: Map<string, string>;
    /**
     * 设置实体数据权限标识
     *
     * @param {IParams} params
     * @param {string} dataAccAction
     * @memberof DeAuthorityService
     */
    setDataAccAction(params: IParams, dataAccAction: string): void;
    /**
     * 获取实体数据权限标识
     *
     * @param {string} key
     * @return {*}  {(string | undefined)}
     * @memberof DeAuthorityService
     */
    getDataAccAction(key: string): string | undefined;
    /**
     * 通过操作标识计算权限
     * @author lxm
     * @date 2023-05-10 12:33:10
     * @param {string} dataAccessAction 操作标识
     * @param {IData} data 实体数据
     * @param {IContext} context 上下文
     * @param {boolean} enablePermission 是否启用权限
     * @return {*}  {Promise<boolean>}
     */
    calcByDataAccessAction(dataAccessAction: string, data: IData | undefined, context: IContext, enablePermission: boolean): Promise<boolean>;
    /**
     * 计算实体附属主实体控制操作标识
     */
    calcMajorDataAccAction(context: IContext): Promise<string | undefined>;
    /**
     * 计算实体数据权限，根据实体数据访问控制方式计算权限
     *
     * 0：无控制 不计算实体数据权限
     * 1：自控制 根据实体数据中的权限标识计算
     * 2：附属主实体控制 先从自身权限标识数据查找，若未找到，再从父权限标识数据查找
     * 3：附属主实体控制（未映射自控）先从自身权限标识数据查找，若未找到，再从父权限标识数据查找
     * @param {string} dataAccessAction 操作标识
     * @param {IData} data 实体数据
     * @param {IContext} context 上下文
     * @memberof DeAuthorityService
     */
    calcDeDataAccAction(dataAccessAction: string, data: IData | undefined, context: IContext): Promise<boolean>;
    /**
     * 通过实体主状态计算权限
     * @author lxm
     * @date 2023-05-10 01:15:43
     * @param {string} dataAccessAction 权限操作标识
     * @param {IData} data 当前数据
     * @param {string} appDeId 应用实体id
     * @return {*}  {Promise<boolean>}
     */
    calcByDeMainState(dataAccessAction: string, data?: IData): Promise<boolean>;
}
//# sourceMappingURL=de-authority.service.d.ts.map