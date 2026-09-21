import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import {
  IAppDataEntity,
  IAppDEDataSetViewMsg,
  IAppViewMsg,
  IAppViewMsgGroup,
  IAppViewMsgGroupDetail,
} from '@ibiz/model-core';
import { isNil, mergeRight } from 'ramda';
import { IViewMessage } from '../../../interface';
import { findDELogic, findFieldById } from '../../../model';
import { execDELogicAction } from '../../../de-logic';
import { ScriptFactory } from '../../../utils';

/** 视图消息前缀 */
export const VIEW_MSG_PREFIX = 'VIEW_MSG';

export class ViewMsgController {
  /**
   * 视图消息组模型
   * @author lxm
   * @date 2023-09-22 05:37:24
   * @type {IAppViewMsgGroup}
   */
  msgGroup!: IAppViewMsgGroup;

  /**
   * 视图消息map
   * @author lxm
   * @date 2023-09-22 05:38:03
   */
  viewMsgMap = new Map<string, IAppViewMsg>();

  /**
   * 视图消息tag
   *
   * @author zhanghengfeng
   * @date 2024-04-23 19:04:58
   */
  protected tag = '';

  constructor(
    protected msgGroupId: string,
    tag: string = '',
  ) {
    this.tag = `${VIEW_MSG_PREFIX}_${tag}`;
  }

  /**
   * 初始化方法，从全局获取视图消息组和视图消息的模型
   * @author lxm
   * @date 2023-09-22 05:41:08
   * @param {IContext} context
   * @return {*}  {Promise<void>}
   */
  async init(context: IContext): Promise<void> {
    const appModel = ibiz.hub.getApp(context.srfappid).model;
    const msgGroup = appModel.appViewMsgGroups?.find(
      item => item.id === this.msgGroupId,
    );
    if (!msgGroup) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.utils.viewMsg.message', {
          msgGroupId: this.msgGroupId,
        }),
      );
    }
    this.msgGroup = msgGroup;

    const msgDetailsViewMsgIds = msgGroup.appViewMsgGroupDetails?.map(
      item => item.appViewMsgId,
    );
    if (!msgDetailsViewMsgIds) return;
    appModel.appViewMsgs?.forEach(item => {
      const index = msgDetailsViewMsgIds.indexOf(item.id);
      if (index !== -1) {
        // 转换视图消息多语言
        if (item.contentLanguageRes?.lanResTag) {
          item.message = ibiz.i18n.t(
            item.contentLanguageRes.lanResTag,
            item.message,
          );
        }
        this.viewMsgMap.set(item.id!, item);
        msgDetailsViewMsgIds.splice(index, 1);
      }
    });
    if (msgDetailsViewMsgIds.length) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.utils.viewMsg.noFound', {
          message: msgDetailsViewMsgIds.join(','),
        }),
      );
    }
  }

  /**
   * 通过属性id获取属性的name属性
   *
   * @author tony001
   * @date 2024-05-08 15:05:03
   * @param {IAppDataEntity} appDataEntity
   * @param {string} [fieldId]
   * @return {*}  {(string | undefined)}
   */
  getDeFieldName(
    appDataEntity: IAppDataEntity,
    fieldId?: string,
  ): string | undefined {
    if (!fieldId) {
      return;
    }
    return findFieldById(appDataEntity, fieldId)?.name?.toLowerCase();
  }

  /**
   * 查询并获取指定实体的数据集数据
   * @author lxm
   * @date 2023-09-20 08:10:57
   * @static
   * @param {IPSAppDEDataSetViewMsg} msgModel
   * @param {IParams} [context={}]
   * @param {IParams} [params={}]
   * @return {*}  {Promise<IData[]>}
   */
  static async fetchDataSet(
    msgModel: IAppDEDataSetViewMsg,
    context: IContext,
    params: IParams,
  ): Promise<IData[]> {
    const { appDataEntityId, appDEDataSetId } = msgModel;
    if (!appDEDataSetId) {
      throw new RuntimeModelError(
        msgModel,
        ibiz.i18n.t('runtime.controller.utils.viewMsg.unconfigured'),
      );
    }

    // 查询数据
    const res = await ibiz.hub
      .getApp(context.srfappid)
      .deService.exec(appDataEntityId!, appDEDataSetId, context, params);

    if (res.data.length) {
      return res.data as IData[];
    }
    return [];
  }

  /**
   * 获取视图消息删除模式存储
   *
   * @author zhanghengfeng
   * @date 2024-05-09 16:05:59
   * @param {IViewMessage} item
   * @return {*}  {(string | null)}
   */
  getMsgRemoveModeStorage(item: IViewMessage): string | null {
    if (item.removeMode !== 1) {
      return null;
    }
    return localStorage.getItem(item.key);
  }

  /**
   * 设置视图消息删除模式存储
   *
   * @author zhanghengfeng
   * @date 2024-05-09 16:05:21
   * @param {IViewMessage} item
   * @return {*}  {void}
   */
  setMsgRemoveModeStorage(item: IViewMessage): void {
    if (item.removeMode !== 1) {
      return;
    }
    localStorage.setItem(item.key, '1');
  }

  /**
   * 计算视图消息是否显示
   *
   * @author zhanghengfeng
   * @date 2024-05-09 16:05:34
   * @param {IAppViewMsg} model
   * @param {IData} data
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {Promise<boolean>}
   */
  async calcViewMsgVisible(
    model: IAppViewMsg,
    data: IData,
    context: IContext,
    params: IParams,
  ): Promise<boolean> {
    const {
      enableMode,
      dataAccessAction,
      appDataEntityId,
      appId,
      testAppDELogicId,
      testScriptCode,
    } = model;
    // 判断实体数据操作标识
    if (enableMode === 'DEOPPRIV' && dataAccessAction) {
      const app = ibiz.hub.getApp(context.srfappid);
      const result = await app.authority.calcByDataAccessAction(
        dataAccessAction,
        context,
        data,
        appDataEntityId,
      );
      return !!result;
    }
    // 判断输出实体逻辑
    if (
      enableMode === 'DELOGIC' &&
      appDataEntityId &&
      appId &&
      testAppDELogicId
    ) {
      const entityModel = await ibiz.hub.getAppDataEntity(
        appDataEntityId,
        appId,
      );
      const deLogic = findDELogic(testAppDELogicId, entityModel);
      if (deLogic) {
        const result = await execDELogicAction(
          deLogic,
          entityModel,
          context,
          data,
          params,
        );
        return !!result.data;
      }
    }
    // 判断脚本
    if (enableMode === 'SCRIPT' && testScriptCode) {
      const result = ScriptFactory.execScriptFn(
        {
          data,
          context,
          params,
        },
        testScriptCode,
        {
          isAsync: false,
          singleRowReturn: true,
        },
      );
      return !!result;
    }

    return true;
  }

  /**
   * 计算视图信息呈现数据
   * @author lxm
   * @date 2023-09-20 09:16:59
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {IViewMessage[]}
   */
  async calcViewMessages(
    context: IContext,
    params: IParams,
  ): Promise<IViewMessage[]> {
    const details = this.msgGroup.appViewMsgGroupDetails;
    const result: IViewMessage[] = [];
    if (details?.length) {
      await Promise.all(
        details.map(async detail => {
          const msgModel = this.viewMsgMap.get(detail.appViewMsgId!)!;
          if (msgModel.dynamicMode === 1) {
            // 动态
            const msgs = await this.calcDynaMsgs(detail, context, params);
            await Promise.all(
              msgs.map(async msg => {
                msg.visible = await this.calcViewMsgVisible(
                  msgModel,
                  msg.data || {},
                  context,
                  params,
                );
              }),
            );
            result.push(...msgs);
          } else {
            // 静态
            const msg = this.calcStaticMsg(detail);
            msg.visible = await this.calcViewMsgVisible(
              msgModel,
              msg.data || {},
              context,
              params,
            );
            result.push(msg);
          }
        }),
      );
    }
    return result.filter(
      item => item.visible && !this.getMsgRemoveModeStorage(item),
    );
  }

  /**
   * 计算静态消息数据(或者动态的里面静态的配置)
   * @author lxm
   * @date 2023-09-20 09:46:45
   * @protected
   * @param {IPSAppViewMsgGroupDetail} detail
   * @return {*}  {IViewMessage}
   */
  protected calcStaticMsg(detail: IAppViewMsgGroupDetail): IViewMessage {
    const { position: position1 } = detail;
    const viewMsg = this.viewMsgMap.get(detail.appViewMsgId!)!;
    const {
      codeName,
      title,
      message,
      removeMode,
      position: position2,
      messageType,
      layoutPanel,
      sysCss,
    } = viewMsg;
    const { userTag, userTag2, userTag3, userTag4 } = viewMsg as IData;

    // detail里的位置优先
    const position = position1 || position2;
    const msg: IViewMessage = {
      key: `${this.tag}_${codeName}`,
      title,
      message,
      position,
      messageType,
      removeMode,
      visible: true,
      layoutPanel,
      sysCss,
      // 额外参数
      extraParams: {
        userTag,
        userTag2,
        userTag3,
        userTag4,
      },
    };
    msg.data = {
      env: msg,
    };
    return msg;
  }

  /**
   * 计算动态视图消息数据
   * @author lxm
   * @date 2023-09-20 09:46:26
   * @protected
   * @param {IPSAppViewMsgGroupDetail} detail
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {Promise<IViewMessage[]>}
   */
  protected async calcDynaMsgs(
    detail: IAppViewMsgGroupDetail,
    context: IContext,
    params: IParams,
  ): Promise<IViewMessage[]> {
    const msgModel = this.viewMsgMap.get(
      detail.appViewMsgId!,
    ) as IAppDEDataSetViewMsg;

    const {
      appDataEntityId,
      orderValueAppDEFieldId,
      titleAppDEFieldId,
      removeFlagAppDEFieldId,
      msgTypeAppDEFieldId,
      contentAppDEFieldId,
      msgPosAppDEFieldId,
      layoutPanel,
    } = msgModel;
    if (!appDataEntityId) {
      throw new RuntimeModelError(
        msgModel,
        ibiz.i18n.t('runtime.controller.utils.viewMsg.unconfiguredEntities'),
      );
    }

    const entity = await ibiz.hub.getAppDataEntity(
      appDataEntityId!,
      context.srfappid,
    );

    // 排序属性
    const fetchParams = { ...params };
    const sortField = this.getDeFieldName(entity, orderValueAppDEFieldId);
    if (sortField) {
      fetchParams.sort = `${sortField},asc`;
    }

    const dataSet = await ViewMsgController.fetchDataSet(
      msgModel,
      context,
      fetchParams,
    );
    if (!dataSet.length) {
      return [];
    }

    const basicMsg = this.calcStaticMsg(detail); // 基础静态的消息
    const titleField = this.getDeFieldName(entity, titleAppDEFieldId);
    const positionField = this.getDeFieldName(entity, msgPosAppDEFieldId);
    const messageField = this.getDeFieldName(entity, contentAppDEFieldId);
    const typeField = this.getDeFieldName(entity, msgTypeAppDEFieldId);
    const removeModeField = this.getDeFieldName(entity, removeFlagAppDEFieldId);

    const deViewMessages: IViewMessage[] = dataSet.map(item => {
      const message: Partial<IViewMessage> = {};
      if (positionField && !isNil(item[positionField])) {
        message.position = item[positionField];
      }
      if (titleField && !isNil(item[titleField])) {
        message.title = item[titleField];
      }
      if (messageField && !isNil(item[messageField])) {
        message.message = item[messageField];
      }
      if (typeField && !isNil(item[typeField])) {
        message.messageType = item[typeField];
      }
      if (removeModeField && !isNil(item[removeModeField])) {
        message.removeMode = item[removeModeField];
      }
      if (!isNil(item.srfkey)) {
        message.key = `${this.tag}_${item.srfkey}`;
      }
      if (layoutPanel) {
        message.layoutPanel = layoutPanel;
      }
      // 合并基础配置，如果后台没有值的用基础配置的默认值。
      const msg = mergeRight(basicMsg, message);
      msg.data = {
        ...item,
        env: msg,
      };

      return msg;
    });

    return deViewMessages;
  }
}
