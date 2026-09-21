import { IAppDataEntity } from '@ibiz/model-core';
import { IAppDeAuthorityService } from '../../../interface';
import {
  matchMainState,
  calcMainStateOPPrivsStrs,
  calcDeCodeNameById,
} from '../../../model';
import { convertToObject } from '../../utils/util/util';

export class DeAuthorityService implements IAppDeAuthorityService {
  constructor(protected entityModel: IAppDataEntity) {}

  /**
   * 数据权限MAP
   *
   * @protected
   * @type {Map<string, string>}
   * @memberof DeAuthorityService
   */
  protected dataAccActionMap: Map<string, string> = new Map();

  /**
   * 设置实体数据权限标识
   *
   * @param {IParams} params
   * @param {string} dataAccAction
   * @memberof DeAuthorityService
   */
  setDataAccAction(params: IParams, dataAccAction: string): void {
    if (params.srfsessionid) {
      this.dataAccActionMap.set(
        `${params.srfsessionid}-${params.srfkey}`,
        dataAccAction,
      );
    }
    this.dataAccActionMap.set(params.srfkey, dataAccAction);
  }

  /**
   * 获取实体数据权限标识
   *
   * @param {string} key
   * @return {*}  {(string | undefined)}
   * @memberof DeAuthorityService
   */
  getDataAccAction(key: string): string | undefined {
    return this.dataAccActionMap.get(key);
  }

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
  async calcByDataAccessAction(
    dataAccessAction: string,
    data: IData | undefined,
    context: IContext,
    enablePermission: boolean,
  ): Promise<boolean> {
    if (enablePermission) {
      // 判断实体数据权限
      const deDataAccActionResult = await this.calcDeDataAccAction(
        dataAccessAction,
        data,
        context,
      );
      if (!deDataAccActionResult) {
        return false;
      }
    }

    // 判断主状态的权限
    const mainStateResult = await this.calcByDeMainState(
      dataAccessAction,
      data,
    );
    if (!mainStateResult) {
      return false;
    }

    return true;
  }

  /**
   * 计算实体附属主实体控制操作标识
   */
  async calcMajorDataAccAction(context: IContext): Promise<string | undefined> {
    const { minorAppDERSs } = this.entityModel;
    if (!minorAppDERSs) return;
    const appDeRSs = minorAppDERSs?.find(rs => {
      const majorDeName = calcDeCodeNameById(rs.majorAppDataEntityId!);
      return (
        Object.prototype.hasOwnProperty.call(context, majorDeName) &&
        context[majorDeName]
      );
    });
    if (!appDeRSs) return;

    const app = await ibiz.hub.getApp(context.srfappid);
    const majorAuthorityService = await app.authority.getService(
      appDeRSs.majorAppDataEntityId!,
    );
    if (!majorAuthorityService) return;

    const majorAppDeName = calcDeCodeNameById(appDeRSs.majorAppDataEntityId!);
    const majorDataAccAction =
      majorAuthorityService.getDataAccAction(
        `${context.srfsessionid}-${context[majorAppDeName]}`,
      ) || majorAuthorityService.getDataAccAction(`${context[majorAppDeName]}`);

    return majorDataAccAction;
  }

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
  async calcDeDataAccAction(
    dataAccessAction: string,
    data: IData | undefined,
    context: IContext,
  ): Promise<boolean> {
    let result = true;
    let tempDataAccObject: IData | undefined;
    const { dataAccCtrlMode } = this.entityModel;

    switch (dataAccCtrlMode) {
      case 1:
        tempDataAccObject = data?.srfdataaccaction
          ? convertToObject(data.srfdataaccaction)
          : undefined;
        break;

      case 2:
      case 3:
        tempDataAccObject = convertToObject(
          await this.calcMajorDataAccAction(context),
        );
        if (data && data.srfdataaccaction) {
          const curDataAccObject = convertToObject(data.srfdataaccaction);
          Object.assign(tempDataAccObject, curDataAccObject);
        }
        break;

      default:
        break;
    }

    if (
      tempDataAccObject &&
      dataAccessAction &&
      !tempDataAccObject[dataAccessAction]
    ) {
      result = false;
    }

    return result;
  }

  /**
   * 通过实体主状态计算权限
   * @author lxm
   * @date 2023-05-10 01:15:43
   * @param {string} dataAccessAction 权限操作标识
   * @param {IData} data 当前数据
   * @param {string} appDeId 应用实体id
   * @return {*}  {Promise<boolean>}
   */
  async calcByDeMainState(
    dataAccessAction: string,
    data: IData = {},
  ): Promise<boolean> {
    let result = true;
    // 无数据时不计算主状态权限
    if (Object.keys(data).length === 0) {
      return result;
    }
    const appDataEntity = this.entityModel;

    // 实体没有启用主状态，默认有权限
    if (!appDataEntity.enableDEMainState || !appDataEntity.demainStates) {
      ibiz.log.debug(
        ibiz.i18n.t('runtime.service.mainState', {
          codeName: appDataEntity.codeName,
        }),
      );
      return result;
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.service.operationIdentifier', {
        dataAccessAction,
      }),
      data,
      appDataEntity,
    );

    const match = matchMainState(appDataEntity, data);
    if (match) {
      ibiz.log.debug(ibiz.i18n.t('runtime.service.matchMasterState'), match);
      const opprivs = calcMainStateOPPrivsStrs(match, appDataEntity);
      ibiz.log.debug(
        ibiz.i18n.t('runtime.service.masterStatePermissions'),
        opprivs,
      );
      result = opprivs.includes(dataAccessAction);
    } else {
      ibiz.log.debug(ibiz.i18n.t('runtime.service.noMatchedState'));
      // 开启了主状态但没有匹配主状态的情况，默认都无权限
      result = false;
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.service.permissionCalculation', {
        dataAccessAction,
        result,
      }),
    );
    return result;
  }
}
