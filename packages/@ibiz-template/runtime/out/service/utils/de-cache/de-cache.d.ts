import { IAppDataEntity } from '@ibiz/model-core';
import { IDataEntity, ITransaction } from '../../../interface';
/**
 * 实体缓存工具类
 *
 * @author chitanda
 * @date 2022-08-17 23:08:56
 * @export
 * @class DECache
 */
export declare class DECache {
    protected entity: IAppDataEntity;
    /**
     * 是否是联合主键
     * @author lxm
     * @date 2023-12-12 02:47:18
     * @readonly
     * @protected
     * @type {boolean}
     */
    protected get isUnionKey(): boolean;
    /**
     * Creates an instance of DECache.
     *
     * @author chitanda
     * @date 2023-12-22 13:12:40
     * @param {IAppDataEntity} entity 应用实体模型
     */
    constructor(entity: IAppDataEntity);
    /**
     * 数据缓存
     *
     * @author chitanda
     * @date 2022-08-17 23:08:08
     * @type {Map<string, IDataEntity>}
     */
    readonly cacheMap: Map<string, IDataEntity>;
    /**
     * 强制设置数据，忽略其他逻辑
     *
     * @author chitanda
     * @date 2022-05-10 17:05:45
     * @param {IContext} context
     * @param {IDataEntity} entity
     */
    forceAdd(_context: IContext, entity: IDataEntity): void;
    /**
     * 强制更新数据，非合并，忽略其他逻辑
     *
     * @author chitanda
     * @date 2022-05-10 17:05:27
     * @param {IContext} context
     * @param {IDataEntity} entity
     */
    forceUpdate(_context: IContext, entity: IDataEntity): void;
    /**
     * 强制删除数据，忽略其他逻辑
     *
     * @author chitanda
     * @date 2022-05-10 17:05:08
     * @param {IContext} context
     * @param {string} srfKey
     */
    forceDelete(_context: IContext, srfKey: string): void;
    /**
     * 新增数据
     *
     * @param {*} context
     * @param {IDataEntity} entity
     * @return {*}  {boolean}
     * @memberof EntityCache
     */
    add(context: IContext, entity: IDataEntity): IDataEntity | null;
    /**
     * 查找数据
     *
     * @param {*} context
     * @param {string} srfKey
     * @return {*}  {IDataEntity}
     * @memberof EntityCache
     */
    get(context: IContext, srfKey: string): IDataEntity | null;
    /**
     * 更新数据
     *
     * @param {IContext} context
     * @param {IDataEntity} entity
     * @return {*}  {IDataEntity}
     * @memberof EntityCache
     */
    update(context: IContext, entity: IDataEntity): IDataEntity | null;
    /**
     * 删除数据
     *
     * @param {IContext} context
     * @param {string} srfKey
     * @return {*}  {(IDataEntity | null)}
     * @memberof EntityCache
     */
    delete(context: IContext, srfKey: string): IDataEntity | null;
    /**
     * 批量创建临时数据
     *
     * @author chitanda
     * @date 2022-03-23 11:03:52
     * @param {IContext} context
     * @param {IDataEntity[]} entities
     * @return {*}  {IDataEntity[]}
     */
    createBatch(context: IContext, entities: IDataEntity[]): IDataEntity[];
    /**
     * 批量更新数据
     *
     * @author chitanda
     * @date 2022-03-23 10:03:17
     * @param {IContext} context
     * @param {IDataEntity[]} entities
     * @return {*}  {IDataEntity[]}
     */
    updateBatch(context: IContext, entities: IDataEntity[]): IDataEntity[];
    /**
     * 批量删除数据
     *
     * @author chitanda
     * @date 2022-03-23 10:03:40
     * @param {IContext} context 上下文
     * @param {string[]} srfKeys 需要删除的数据主键
     * @return {*}  {IDataEntity[]} 未能删除的数据主键
     */
    deleteBatch(context: IContext, srfKeys: string[]): IDataEntity[];
    /**
     * 检查数据是否已经存在
     *
     * @author chitanda
     * @date 2022-08-17 23:08:06
     * @param {IContext} context
     * @param {string} srfkey
     * @return {*}  {boolean}
     */
    checkData(_context: IContext, srfkey: string): boolean;
    /**
     * 获取当前已经缓存的数据
     *
     * @author chitanda
     * @date 2023-12-22 14:12:57
     * @return {*}  {IDataEntity[]}
     */
    getList(): IDataEntity[];
    /**
     * 根据条件生成查询
     *
     * @author chitanda
     * @date 2022-08-17 23:08:33
     * @param {IParams} [params={}]
     * @return {*}  {<U>(testObj: U) => boolean}
     */
    generatePred(params?: IParams): <U>(testObj: U) => boolean;
    /**
     * 清空缓存
     *
     * @author chitanda
     * @date 2023-12-22 13:12:17
     */
    clear(): void;
    /**
     * 根据联合键值计算主键并赋值
     * @author lxm
     * @date 2023-12-12 03:06:30
     * @param {(IDataEntity | IDataEntity[])} data 需要计算的数据或数据集合
     */
    protected calcUnionKey(data: IDataEntity): void;
    /**
     * 根据上下文，获取已经开启的事务
     *
     * @author chitanda
     * @date 2024-01-17 15:01:28
     * @protected
     * @param {IContext} context
     * @return {*}  {(ITransaction | null)}
     */
    protected getTransaction(context: IContext): ITransaction | null;
}
//# sourceMappingURL=de-cache.d.ts.map