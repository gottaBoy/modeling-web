import { IAppDERS } from '@ibiz/model-core';
import { Transaction } from './transaction';
/**
 * 界面域
 *
 * @author chitanda
 * @date 2023-12-22 15:12:07
 * @export
 * @class UIDomain
 */
export declare class UIDomain {
    /**
     * 唯一域标识
     *
     * @author chitanda
     * @date 2023-12-22 15:12:12
     * @type {string}
     */
    readonly id: string;
    /**
     * 状态
     *
     * @author chitanda
     * @date 2024-01-15 19:01:51
     * @type {{ rsInit: boolean }} 关系是否已经初始化
     */
    readonly state: {
        rsInit: boolean;
    };
    /**
     * DTO 子父关系映射
     *
     * @author chitanda
     * @date 2023-12-26 15:12:13
     * @protected
     * @type {Map<string, IAppDERS[]>} Map<子实体, 当前实体的父关系>
     */
    protected rsMap: Map<string, IAppDERS[]>;
    /**
     * DTO 父子关系映射
     *
     * @author chitanda
     * @date 2024-01-15 17:01:42
     * @protected
     * @type {Map<string, IAppDERS[]>}
     */
    protected rs2Map: Map<string, IAppDERS[]>;
    /**
     * 当前界面域下唯一事务
     *
     * @author chitanda
     * @date 2024-01-17 15:01:07
     * @type {Transaction}
     */
    readonly transaction: Transaction;
    /**
     * 界面域是否发生数据变更，在域下数据修改后改为 true ，在数据提交后改为 false
     *
     * @author chitanda
     * @date 2024-03-04 13:03:08
     */
    dataModification: boolean;
    /**
     * Creates an instance of UIDomain.
     *
     * @author chitanda
     * @date 2024-03-04 13:03:29
     * @param {string} [id]
     */
    constructor(id?: string);
    /**
     * 界面域数据发生变更
     *
     * @author chitanda
     * @date 2024-03-04 14:03:06
     */
    dataChange(): void;
    /**
     * 界面域数据变更已提交
     *
     * @author chitanda
     * @date 2024-03-04 14:03:15
     */
    dataChangeCompleted(): void;
    /**
     * 设置当前界面域下，指定实体的相关父关系以及属性。在 DTO 包解析时设置此参数，销毁时清空
     *
     * @author chitanda
     * @date 2023-12-26 15:12:31
     * @param {string} appDataEntityId
     * @param {IAppDERS} configs
     */
    setDERConfig(appDataEntityId: string, configs: IAppDERS[]): void;
    /**
     * 获取当前界面域下，具体实体的关系(在数据加载完成之后才有值)
     *
     * @author chitanda
     * @date 2023-12-26 16:12:07
     * @param {string} appDataEntityId
     * @return {*}  {IAppDERS[]}
     */
    getDERConfig(appDataEntityId: string): IAppDERS[];
    /**
     * 查询指定主实体下的所有子实体关系
     *
     * @author chitanda
     * @date 2024-01-17 16:01:21
     * @param {string} appDataEntityId
     * @return {*}  {IAppDERS[]}
     */
    getDERConfigByMajor(appDataEntityId: string): IAppDERS[];
    /**
     * 根据模型给的子实体中的父关系模型，计算每个实体的子关系模型
     *
     * @author chitanda
     * @date 2024-01-15 19:01:49
     */
    calcParentRs(): void;
    /**
     * 界面域销毁
     *
     * @author chitanda
     * @date 2023-12-22 15:12:49
     */
    destroy(): void;
}
//# sourceMappingURL=ui-domain.d.ts.map