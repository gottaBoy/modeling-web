import { IAppDataEntity, IDEMainState } from '@ibiz/model-core';
/**
 * 匹配实体的主状态，获取主状态模型
 * @author lxm
 * @date 2023-05-10 01:24:26
 * @export
 * @param {IAppDataEntity} appDataEntity 实体模型
 * @param {IData} data 实体数据
 * @return {*}  {(IDEMainState | undefined)}
 */
export declare function matchMainState(appDataEntity: IAppDataEntity, data: IData): IDEMainState | undefined;
/**
 * 获取主状态对应的可执行的操作标识字符串集合
 * @author lxm
 * @date 2023-05-10 01:28:40
 * @export
 * @param {IDEMainState} mainState
 * @param {IAppDataEntity} appDataEntity
 * @return {*}  {string[]}
 */
export declare function calcMainStateOPPrivsStrs(mainState: IDEMainState, appDataEntity: IAppDataEntity): string[];
//# sourceMappingURL=main-state.d.ts.map