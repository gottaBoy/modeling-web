import { IAppDataEntity } from '@ibiz/model-core';
import { Srfuf } from '../constant';
import { IDataEntity } from '../../interface';
/**
 * 实体
 *
 * @author chitanda
 * @date 2022-08-17 22:08:49
 * @export
 * @class AppDataEntity
 */
export declare class AppDataEntity implements IDataEntity {
    [key: string | symbol]: any;
    protected _data: IData;
    protected _entity: IAppDataEntity;
    srfdeid: string;
    srfdecodename: string;
    srfkeyfield: string;
    srfmajorfield: string;
    srfkey: string;
    srfmajortext: string;
    tempsrfkey: string;
    srfordervalue: number;
    get srfuf(): Srfuf;
    /**
     * Creates an instance of AppDataEntity.
     *
     * @author chitanda
     * @date 2023-11-16 15:11:08
     * @param {IAppDataEntity} entity
     * @param {(IData | AppDataEntity)} [data={}]
     */
    constructor(entity: IAppDataEntity, data?: IData | AppDataEntity);
    /**
     * 代理实际数据
     *
     * @author chitanda
     * @date 2022-10-11 22:10:55
     * @protected
     */
    protected defineProperties(): void;
    /**
     * 克隆数据
     *
     * @author chitanda
     * @date 2022-10-11 00:10:15
     * @return {*}  {AppDataEntity}
     */
    clone(): AppDataEntity;
    /**
     * 合并参数
     *
     * @author chitanda
     * @date 2022-10-19 11:10:25
     * @param {(IData | AppDataEntity)} data
     * @return {*}  {AppDataEntity}
     */
    assign(data: IData | AppDataEntity): AppDataEntity;
    /**
     * 根据属性的数据类型转换值
     * @author lxm
     * @date 2023-09-25 03:37:28
     * @protected
     * @param {unknown} value
     * @param {(number | undefined)} dataType
     * @return {*}  {unknown}
     */
    protected convertVal(value: unknown, dataType: number | undefined): unknown;
}
//# sourceMappingURL=app-data-entity.d.ts.map