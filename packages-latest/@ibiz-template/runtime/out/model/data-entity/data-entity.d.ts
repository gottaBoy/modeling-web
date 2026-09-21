import { IDELogic, IAppDEField, IAppDEACMode, IAppDataEntity, IAppDEDataImport } from '@ibiz/model-core';
/**
 * 从实体id计算实体codeName(小写)
 * @author lxm
 * @date 2023-05-16 11:40:16
 * @export
 * @param {string} id 实体id
 * @return {*}
 */
export declare function calcDeCodeNameById(id: string): string;
/**
 * 判断对象里是否有实体codeName小写表示的主键
 *
 * @author lxm
 * @date 2023-05-16 11:45:30
 * @export
 * @param {IParams} params
 * @param {string} entityId
 * @return {*}  {boolean}
 */
export declare function hasDeCodeName(params: IParams, entityId: string): boolean;
/**
 * 通过appDEACModeId从实体中找出对应自填模式模型
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-05-31 10:26:24
 */
export declare function getDeACMode(appDEACModeId: string, entityId: string, srfappid: string): Promise<IAppDEACMode | undefined>;
/**
 * @description 获取指定属性的父关系连接文本属性
 * @export
 * @param {string} appDEFieldId
 * @param {IAppDataEntity} [appDataEntity]
 * @returns {*}  {(string | undefined)}
 */
export declare function getParentTextAppDEFieldId(appDEFieldId: string, appDataEntity?: IAppDataEntity): string | undefined;
/**
 * 从实体里找到实体逻辑
 * @author lxm
 * @date 2023-06-13 08:05:09
 * @export
 * @param {string} appDELogicId 实体逻辑id
 * @param {IAppDataEntity} entity 实体模型
 * @return {*}
 */
export declare function findDELogic(appDELogicId: string, entity: IAppDataEntity): IDELogic | undefined;
/**
 * 过滤出指定类型的属性实体逻辑
 * @author lxm
 * @date 2023-06-14 12:25:00
 * @export
 * @param {IAppDataEntity} entity
 * @param {('compute' | 'change' | 'default')} type
 * @return {*}
 */
export declare function filterFieldLogics(entity: IAppDataEntity, type: 'compute' | 'change' | 'default'): IDELogic[];
/**
 * 通过id找到实体的属性
 * @author lxm
 * @date 2023-06-14 11:07:52
 * @export
 * @param {IAppDataEntity} entity
 * @param {string} fieldId
 * @return {*}
 */
export declare function findFieldById(entity: IAppDataEntity, fieldId: string): IAppDEField | undefined;
/**
 * 获取默认导入模型
 * @author lxm
 * @date 2024-04-18 02:44:09
 * @export
 * @param {IAppDataEntity} entity
 * @return {*}  {(IAppDEDataImport | undefined)}
 */
export declare function getDefaultDataImport(entity: IAppDataEntity): IAppDEDataImport | undefined;
//# sourceMappingURL=data-entity.d.ts.map