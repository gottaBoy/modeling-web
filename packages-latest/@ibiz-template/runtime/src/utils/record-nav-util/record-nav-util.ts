/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RuntimeError } from '@ibiz-template/core';
import { createUUID } from 'qx-util';
import { IMDControlController, IRecordNavUtil } from '../../interface';

/**
 *
 * 记录导航工具类
 *
 * @author tony001
 * @date 2024-07-15 13:07:12
 * @export
 * @class RecordNavUtil
 * @implements {IRecordNavUtil}
 */
export class RecordNavUtil implements IRecordNavUtil {
  /**
   * 部件Map
   *
   * @author tony001
   * @date 2024-07-15 13:07:58
   * @private
   * @type {Map<string, IMDControlController>}
   */
  private controlMap: Map<string, IMDControlController> = new Map();

  /**
   * 触发源Map
   *
   * @author tony001
   * @date 2024-09-27 14:09:19
   * @private
   * @type {Map<string, IData>}
   */
  private triggerLogicMap: Map<string, IData> = new Map();

  /**
   * 添加部件数据
   *
   * @author tony001
   * @date 2024-07-15 13:07:10
   * @param {string} id
   * @param {IMDControlController} ctrl
   */
  add(id: string, ctrl: IMDControlController): void {
    this.controlMap.set(id, ctrl);
  }

  /**
   * 添加触发源
   *
   * @author tony001
   * @date 2024-09-27 15:09:31
   * @param {string} viewId
   * @param {IData} data
   * @param {IData} tempContext
   */
  addTriggerLogic(viewId: string, data: IData, tempContext: IData): void {
    const triggerLogicId = `${viewId}:${createUUID()}`;
    this.triggerLogicMap.set(triggerLogicId, data);
    tempContext.srfnavlogicid = triggerLogicId;
  }

  /**
   * 删除部件数据
   *
   * @author tony001
   * @date 2024-07-15 13:07:23
   * @param {string} id
   */
  remove(id: string): void {
    this.controlMap.delete(id);
  }

  /**
   * 通过视图标识删除触发源
   *
   * @author tony001
   * @date 2024-09-27 15:09:16
   * @param {string} viewId
   */
  removeTriggerLogic(viewId: string): void {
    const triggerLogicKeys = Array.from(this.triggerLogicMap.keys());
    triggerLogicKeys.forEach(key => {
      if (key.startsWith(viewId)) {
        this.triggerLogicMap.delete(key);
      }
    });
  }

  /**
   * 获取部件数据
   *
   * @author tony001
   * @date 2024-07-15 14:07:32
   * @param {string} id
   * @return {*}  {(IMDControlController | undefined)}
   */
  getCtrl(id: string): IMDControlController | undefined {
    return this.controlMap.get(id);
  }

  /**
   * 获取触发源数据
   *
   * @author tony001
   * @date 2024-09-27 14:09:22
   * @param {string} id
   * @return {*}  {(IData | undefined)}
   */
  getTriggerLogic(id: string): IData | undefined {
    return this.triggerLogicMap.get(id);
  }

  /**
   * 获取第一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:26
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  async getFirstRecord(
    ctrlId: string,
    dataId: string,
  ): Promise<IData | undefined> {
    const targrtCtrl = this.getCtrl(ctrlId);
    if (!targrtCtrl) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.utils.recordNav.noFoundCtrl', {
          ctrlId,
        }),
      );
    }
    const locateRecordField =
      targrtCtrl.controlParams.locaterecordkey || 'srfkey';
    const items = await targrtCtrl.goToFirstPage();
    if (items && items.length > 0) {
      const firstItem = items[0];
      if (firstItem[locateRecordField] === dataId) {
        ibiz.message.warning(
          ibiz.i18n.t('runtime.utils.recordNav.firstRecord'),
        );
        return;
      }
      return firstItem;
    }
  }

  /**
   * 获取上一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:01
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  async getPreviousRecord(
    ctrlId: string,
    dataId: string,
  ): Promise<IData | undefined> {
    const targrtCtrl = this.getCtrl(ctrlId);
    if (!targrtCtrl) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.utils.recordNav.noFoundCtrl', {
          ctrlId,
        }),
      );
    }
    const locateRecordField =
      targrtCtrl.controlParams.locaterecordkey || 'srfkey';
    let targetData;
    const { items } = targrtCtrl.state;
    const findIndex: number = items.findIndex((item: IData) => {
      return item[locateRecordField] === dataId;
    });
    if (findIndex === 0) {
      const preItems = await targrtCtrl.goToPreviousPage();
      if (preItems && preItems.length > 0) {
        targetData = preItems[preItems.length - 1];
      } else {
        ibiz.message.warning(
          ibiz.i18n.t('runtime.utils.recordNav.firstRecord'),
        );
        return;
      }
    } else {
      targetData = items[findIndex - 1];
    }
    return targetData;
  }

  /**
   * 获取下一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:17
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  async getNextRecord(
    ctrlId: string,
    dataId: string,
  ): Promise<IData | undefined> {
    const targrtCtrl = this.getCtrl(ctrlId);
    if (!targrtCtrl) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.utils.recordNav.noFoundCtrl', {
          ctrlId,
        }),
      );
    }
    const locateRecordField =
      targrtCtrl.controlParams.locaterecordkey || 'srfkey';
    let targetData;
    const { items } = targrtCtrl.state;
    const { pagingMode } = targrtCtrl.model as IModel;
    const findIndex: number = items.findIndex((item: IData) => {
      return item[locateRecordField] === dataId;
    });
    if (findIndex === items.length - 1) {
      const nextItems = await targrtCtrl.goToNextPage();
      if (nextItems && nextItems.length > 0) {
        if (pagingMode === 1) {
          targetData = nextItems[0];
        } else {
          const targetIndex: number = nextItems.findIndex((item: IData) => {
            return item[locateRecordField] === dataId;
          });
          if (nextItems[targetIndex + 1]) {
            targetData = nextItems[targetIndex + 1];
          } else {
            ibiz.message.warning(
              ibiz.i18n.t('runtime.utils.recordNav.lastRecord'),
            );
            return;
          }
        }
      } else {
        ibiz.message.warning(ibiz.i18n.t('runtime.utils.recordNav.lastRecord'));
        return;
      }
    } else {
      targetData = items[findIndex + 1];
    }
    return targetData;
  }

  /**
   * 获取最后一条记录
   *
   * @author tony001
   * @date 2024-07-15 15:07:31
   * @param {string} ctrlId
   * @param {string} dataId
   * @return {*}  {Promise<IData | undefined>}
   */
  async getLastRecord(
    ctrlId: string,
    dataId: string,
  ): Promise<IData | undefined> {
    const targrtCtrl = this.getCtrl(ctrlId);
    if (!targrtCtrl) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.utils.recordNav.noFoundCtrl', {
          ctrlId,
        }),
      );
    }
    const locateRecordField =
      targrtCtrl.controlParams.locaterecordkey || 'srfkey';
    const items = await targrtCtrl.goToLastPage();
    if (items && items.length > 0) {
      const lastItem = items[items.length - 1];
      if (lastItem[locateRecordField] === dataId) {
        ibiz.message.warning(ibiz.i18n.t('runtime.utils.recordNav.lastRecord'));
        return;
      }
      return lastItem;
    }
  }
}
