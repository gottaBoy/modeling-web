/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
import { IHttpResponse, IMarkOpenData } from '@ibiz-template/core';
import { ViewMode } from '../constant';
import {
  MarkOpenDataActionType,
  IPanelItemCoopPosController,
} from '../interface';
import { calcDeCodeNameById } from '../model';
import { ViewEngineBase } from './view-base.engine';

/**
 * 实体主数据视图引擎
 *
 * @export
 * @class DEMainViewEngine
 * @extends {ViewEngineBase}
 */
export class DEMainViewEngine extends ViewEngineBase {
  /**
   * 协同消息占位
   *
   * @readonly
   * @type {(IPanelItemCoopPosController | undefined)}
   * @memberof DEMainViewEngine
   */
  get coopPos(): IPanelItemCoopPosController | undefined {
    return this.view.layoutPanel?.panelItems
      .coop_pos as IPanelItemCoopPosController;
  }

  /**
   * 标记数据行为类型
   *
   * @protected
   * @type {MarkOpenDataActionType[]}
   * @memberof DEMainViewEngine
   */
  protected doActions: MarkOpenDataActionType[] = [];

  /**
   * 标记模式
   *
   * @protected
   * @type {string[]}
   * @memberof DEMainViewEngine
   */
  protected markModes: string[] = [];

  /**
   * 实体名称
   *
   * @protected
   * @type {string}
   * @memberof DEMainViewEngine
   */
  protected deName!: string;

  /**
   * 是否打开刷新提示消息框
   *
   * @protected
   * @type {boolean}
   * @memberof DEMainViewEngine
   */
  protected hasOpenConfirm: boolean = false;

  /**
   * 是否已监听数据标记行为
   *
   * @protected
   * @type {boolean}
   * @memberof DEMainViewEngine
   */
  protected hasSubscribe: boolean = false;

  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof DEMainViewEngine
   */
  async onCreated(): Promise<void> {
    await super.onCreated();
    if (this.view.model.appDataEntityId) {
      this.deName = calcDeCodeNameById(this.view.model.appDataEntityId);
    }
  }

  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof DEMainViewEngine
   */
  async onMounted(): Promise<void> {
    await super.onMounted();
    this.initMarkOpenData();
  }

  /**
   * 刷新确认
   *
   * @protected
   * @return {*}  {Promise<boolean>}
   * @memberof DEMainViewEngine
   */
  protected async reloadConfirm(): Promise<boolean> {
    const result = await ibiz.confirm.info({
      title: ibiz.i18n.t('viewEngine.refreshPrompt'),
      desc: ibiz.i18n.t('viewEngine.refreshPagePrompt'),
    });
    return result;
  }

  /**
   * 刷新
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof DEMainViewEngine
   */
  protected async refresh(): Promise<void> {}

  /**
   * 标记打开数据模式回调
   *
   * @protected
   * @param {IMarkOpenData} data
   * @param {string} dataInfo
   * @return {*}  {Promise<void>}
   * @memberof DEMainViewEngine
   */
  protected async markOpenDataCallback(
    data: IMarkOpenData,
    dataInfo?: string,
  ): Promise<void> {
    let actionMsg = '';
    switch (data.action) {
      case 'VIEW':
        actionMsg = ibiz.i18n.t('viewEngine.browseMsg');
        break;
      case 'EDIT':
        actionMsg = ibiz.i18n.t('viewEngine.editMsg');
        break;
      case 'UPDATE':
        actionMsg = ibiz.i18n.t('viewEngine.updateMsg');
        break;
      default:
        break;
    }
    const message = `${data.username} ${actionMsg} ${this.view.state.caption}${dataInfo ? '-' + dataInfo : ''}`;
    if (this.coopPos) {
      this.coopPos.updateMessage({
        title: message,
        data,
      });
    } else {
      // 非激活不触发提示
      if (!this.view.state.activated) {
        return;
      }
      ibiz.message.notice({
        message,
        showClose: true,
        duration: 3,
        styleType: 'alert',
      });
    }
    if (
      this.hasOpenConfirm === false &&
      data.action === 'UPDATE' &&
      this.markModes.includes('NOTICERELOAD') &&
      this.view.state.activated
    ) {
      this.hasOpenConfirm = true;
      const isReload = await this.reloadConfirm();
      if (isReload) {
        this.refresh();
      }
      this.hasOpenConfirm = false;
    }
  }

  /**
   * 初始化标记打开数据相关逻辑
   *
   * @protected
   * @return {*}  {void}
   * @memberof DEMainViewEngine
   */
  protected initMarkOpenData(): void {
    // 非路由的视图不需要触发（防止多个界面同时操作一条数据，消息重复）
    const markOpenDataMode = (this.view.model as IData).markOpenDataMode;
    if (
      ![ViewMode.ROUTE, ViewMode.ROUTE_MODAL].includes(this.view.modal.mode) ||
      !markOpenDataMode
    ) {
      return;
    }
    this.markModes = markOpenDataMode.split(';');
    // 初始化协同消息占位消息模式
    this.coopPos?.initMessageModes(this.markModes);
    this.doActions = [];
    // OPENDATA：登记打开数据、 EDITDATA：登记更新数据、 DISPLAYOPPERSON：显示操作人员、 NOTICERELOAD：提示刷新数据
    if (
      this.markModes.includes('EDITDATA') ||
      this.markModes.includes('DISPLAYOPPERSON') ||
      this.markModes.includes('NOTICERELOAD')
    ) {
      this.doActions.push('EDIT', 'VIEW', 'UPDATE', 'CLOSE');
    } else if (this.markModes.includes('OPENDATA')) {
      this.doActions.push('VIEW', 'CLOSE');
    }
    this.view.evt.on('onUpdateAccessState', async () => {
      this.sendViewDataAction();
    });
    if (this.doActions.length !== 0) {
      this.doMarkDataAction();
    }
  }

  /**
   * 发送查看数据标记行为
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof DEMainViewEngine
   */
  protected async sendViewDataAction(): Promise<void> {
    const data = this.getData()[0];
    if (!data) {
      return;
    }
    const result = await this.sendMarkDataAction('VIEW', data.srfkey);
    if (result.ok && result.data.length > 0) {
      (result.data as IData[]).forEach(item => {
        if (item.data)
          this.coopPos?.updateMessage({
            data: item.data,
          });
      });
    }
    this.view.initTimeoutTimer();
    this.subscribeMarkDataAction(data.srfkey);
  }

  /**
   * 发送标记数据行为
   *
   * @protected
   * @param {string} key
   * @memberof DEMainViewEngine
   */
  protected async sendMarkDataAction(
    action: MarkOpenDataActionType,
    key?: string,
  ): Promise<IHttpResponse<IData>> {
    let markKey = `${this.view.model.codeName?.toLowerCase()}@${key}`;
    // 视图上配置了srfmarkopendatakey，则以其为准
    if (this.view.params.srfmarkopendatakey) {
      markKey = this.view.params.srfmarkopendatakey;
    }
    return ibiz.markOpenData.action(this.deName, markKey, action);
  }

  /**
   * 监听标记数据行为
   *  - 只存在一个监听
   * @protected
   * @param {string} key
   * @return {*}  {Promise<void>}
   * @memberof DEMainViewEngine
   */
  protected subscribeMarkDataAction(key: string): void {
    if (!this.hasSubscribe) {
      // 只存在一个监听
      const callback = (data: IMarkOpenData): void => {
        const item = this.getData()[0];
        this.markOpenDataCallback(data, item?.srfmajortext);
      };
      let markKey = `${this.view.model.codeName?.toLowerCase()}@${key}`;
      // 视图上配置了srfmarkopendatakey，则以其为准
      if (this.view.params.srfmarkopendatakey) {
        markKey = this.view.params.srfmarkopendatakey;
      }
      ibiz.markOpenData.subscribe(this.deName, markKey, callback);
      this.view.evt.on('onDestroyed', () => {
        ibiz.markOpenData.unsubscribe(this.deName, markKey, callback);
      });
      this.hasSubscribe = true;
    }
  }

  /**
   * 执行标记数据行为
   * - VIEW, EDIT, UPDATE 子类实现
   * @protected
   * @memberof DEMainViewEngine
   */
  protected doMarkDataAction(): void {
    if (this.doActions.includes('CLOSE')) {
      this.view.evt.on('onCloseView', () => {
        const data = this.getData()[0];
        if (data?.srfkey) this.sendMarkDataAction('CLOSE', data.srfkey);
      });
    }
  }
}
