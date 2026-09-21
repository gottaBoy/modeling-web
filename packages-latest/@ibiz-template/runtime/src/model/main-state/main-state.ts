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
export function matchMainState(
  appDataEntity: IAppDataEntity,
  data: IData,
): IDEMainState | undefined {
  const { mainStateAppDEFieldIds, demainStates } = appDataEntity;
  if (mainStateAppDEFieldIds && demainStates) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];
    mainStateAppDEFieldIds.forEach(field => {
      values.push(data[field]);
    });
    return demainStates.find(item => {
      const { stateValue, state2Value, state3Value } = item;
      let result = true;
      const stateValues = [stateValue, state2Value, state3Value];
      for (let i = 0; i < values.length; i++) {
        if (`${values[i]}` !== `${stateValues[i]}`) {
          result = false;
          break;
        }
      }
      return result;
    });
  }
}

/**
 * 获取主状态对应的可执行的操作标识字符串集合
 * @author lxm
 * @date 2023-05-10 01:28:40
 * @export
 * @param {IDEMainState} mainState
 * @param {IAppDataEntity} appDataEntity
 * @return {*}  {string[]}
 */
export function calcMainStateOPPrivsStrs(
  mainState: IDEMainState,
  appDataEntity: IAppDataEntity,
): string[] {
  const app = ibiz.hub.getApp(appDataEntity.appId).model;
  const { demainStateOPPrivs, opprivAllowMode } = mainState;
  const mainStateOPPrivIds = demainStateOPPrivs?.map(item => item.name!) || [];
  let opprivs: string[] = [];

  // 允许模式只给配了的，拒绝模式给除了配了的之外的
  if (opprivAllowMode) {
    opprivs = mainStateOPPrivIds;
  } else {
    // 全部操作标识集合包含实体的和系统的
    const allOPPrivs = [...app.deopprivs!, ...appDataEntity.deopprivs!];
    opprivs = allOPPrivs
      .filter(item => !mainStateOPPrivIds.includes(item.name!))
      .map(item => item.name!);
  }
  return opprivs;
}
