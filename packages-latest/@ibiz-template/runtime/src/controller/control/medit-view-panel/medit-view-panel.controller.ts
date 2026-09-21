/* eslint-disable no-shadow */
import { IApiData, IPortalMessage, RuntimeError } from '@ibiz-template/core';
import { IDEMultiEditViewPanel } from '@ibiz/model-core';
import { createUUID } from 'qx-util';
import {
  IMEditViewPanelState,
  IMEditViewPanelEvent,
  IMEditViewPanelController,
  MDCtrlLoadParams,
  IPanelUiItem,
  DataChangeEvent,
  EventBase,
  IViewController,
  IApiFormSaveParams,
} from '../../../interface';
import { ControlVO } from '../../../service';
import { MDControlController } from '../../common';
import { MEditViewPanelService } from './medit-view-panel.service';
import { SysUIActionTag } from '../../../constant';

/**
 * 多编辑视图面板部件控制器
 * @export
 * @class MEditViewPanelController
 * @extends {MDControlController<IDEMultiEditViewPanel, IMEditViewPanelState, IMEditViewPanelEvent>}
 * @implements {IMEditViewPanelController}
 */
export class MEditViewPanelController
  extends MDControlController<
    IDEMultiEditViewPanel,
    IMEditViewPanelState,
    IMEditViewPanelEvent
  >
  implements IMEditViewPanelController
{
  declare service: MEditViewPanelService;

  /**
   * 当前应用视图参数对象
   *
   */
  parameters: IData[] = [];

  /**
   * @description 嵌入视图
   * @type {Map<string, IViewController>}
   * @memberof MEditViewPanelController
   */
  embedViews: Map<string, IViewController> = new Map();

  protected async onCreated(): Promise<void> {
    await super.onCreated();
    this.service = new MEditViewPanelService(this.model);
    await this.service.init(this.context);
    await this.initParameters();
  }

  protected initState(): void {
    super.initState();
    this.state.panelUiItems = [];
    this.state.activeTab = '';
    this.state.size = 1000;
    this.state.isNeedScroll = false;
  }

  /**
   * 初始化嵌入应用视图及实体参数对象
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-10-16 13:56:56
   */
  async initParameters(): Promise<void> {
    if (this.model.embeddedAppViewId) {
      const embedView = await ibiz.hub.getAppView(this.model.embeddedAppViewId);
      if (embedView.appDataEntityId) {
        const embedViewEntity = await ibiz.hub.getAppDataEntity(
          embedView.appDataEntityId,
          embedView.appId,
        );
        if (embedView && embedViewEntity) {
          this.parameters = [
            {
              parameterName: embedViewEntity.keyAppDEFieldId?.toLowerCase(),
              pathName: embedViewEntity.codeName?.toLowerCase(),
            },
          ];
        } else {
          this.parameters = [];
        }
      }
    }
  }

  /**
   * 部件加载后处理
   *
   * @author chitanda
   * @date 2023-06-21 15:06:44
   * @param {MDCtrlLoadParams} args 本次请求参数
   * @param {IData[]} items 上游处理的数据（默认是后台数据）
   * @return {*}  {Promise<IData[]>} 返回给后续处理的数据
   */
  async afterLoad(
    args: MDCtrlLoadParams,
    items: ControlVO[],
  ): Promise<ControlVO[]> {
    await super.afterLoad(args, items);
    // 找出临时UI数据
    const tempPanelUiItems = this.state.panelUiItems.filter(UiItem => {
      return UiItem.id.startsWith('mockId:');
    });
    this.state.panelUiItems = [];
    this.doItems(items, tempPanelUiItems);
    // 设置默认激活
    if (
      this.model.panelStyle === 'TAB_TOP' &&
      this.state.panelUiItems.length > 0 &&
      tempPanelUiItems.length === 0
    ) {
      this.state.activeTab = this.state.panelUiItems[0].id;
    }
    return items;
  }

  /**
   * 处理UI所需数据
   * @param {ControlVO} arg
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-10-16 17:55:31
   */
  handlePanelItemParams(arg: ControlVO): IPanelUiItem {
    const [{ parameterName }] = this.parameters;
    const id: string = arg[parameterName]
      ? arg[parameterName]
      : `mockId:${createUUID()}`;
    const item = {
      id,
      context: this.context.clone(),
      params: {},
      data: arg,
      srfmajortext: '',
    };

    // 当前视图参数（应用实体视图）
    this.parameters.forEach(parameter => {
      const { parameterName, pathName } = parameter;
      if (arg[parameterName] && !Object.is(arg[parameterName], '')) {
        Object.assign(item.context, {
          [pathName]: arg[parameterName],
        });
      }

      // 当前页面实体主信息
      if (arg.srfmajortext && !Object.is(arg.srfmajortext, '')) {
        Object.assign(item, { srfmajortext: arg.srfmajortext });
      } else if (arg.srfuf === 0) {
        Object.assign(item, {
          srfmajortext: ibiz.i18n.t(
            'runtime.controller.control.meditViewPanel.DraftNew',
          ),
        });
      }
    });

    return item;
  }

  /**
   * 处理数据
   * @param {ControlVO} datas
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-10-16 15:00:02
   */
  doItems(datas: ControlVO[], tempPanelUiItems?: IPanelUiItem[]): void {
    datas.forEach((arg: ControlVO) => {
      const item = this.handlePanelItemParams(arg);
      this.state.panelUiItems.push(item);
    });
    if (tempPanelUiItems) {
      this.state.panelUiItems.push(...tempPanelUiItems);
    }
  }

  /**
   * 处理添加
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-10-16 15:18:01
   */
  async handleAdd(): Promise<void> {
    this.state.isNeedScroll = true;
    this.doItems([{ srfuf: 0 } as ControlVO]);
    if (this.model.panelStyle === 'TAB_TOP') {
      // 上分页添加后激活最后一个
      this.state.activeTab =
        this.state.panelUiItems[this.state.panelUiItems.length - 1].id;
    }
    const data = this.state.panelUiItems.find(
      item => item.id === this.state.activeTab,
    );
    this.evt.emit('onAddSuccess', { data });
  }

  /**
   * 处理删除
   * @param {IPanelUiItem} item
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-10-16 15:23:59
   */
  async handleDelete(item: IPanelUiItem): Promise<void> {
    this.state.isNeedScroll = false;
    const index = this.state.panelUiItems.findIndex(value => {
      return value === item;
    });
    let isBackToEnd = false;
    // 如果删除的是激活项，且为最后一项，设置激活项为前一项
    if (
      item.id === this.state.activeTab &&
      index === this.state.panelUiItems.length - 1
    ) {
      if (index > 0) {
        isBackToEnd = true;
      }
    }
    // 新建的界面上删除即可
    if (item.data.srfuf === 0) {
      // 删除items中已删除的项
      this.state.panelUiItems.splice(index, 1);
      this.evt.emit('onRemoveSuccess', undefined);
    } else {
      await this.remove({ data: [item.data], notRefresh: true });
    }
    if (isBackToEnd) {
      this.state.activeTab =
        this.state.panelUiItems[this.state.panelUiItems.length - 1].id;
    }
  }

  /**
   * 后台删除结束后界面删除逻辑
   *
   * @author lxm
   * @date 2022-09-06 19:09:10
   * @param {IData} data
   */
  afterRemove(data: IData): void {
    super.afterRemove(data);
    // 删除this.items里的数据
    const index = this.state.panelUiItems.findIndex(
      item => item.data.srfkey === data.srfkey,
    );
    if (index !== -1) {
      this.state.panelUiItems.splice(index, 1);
    }
  }

  /**
   * 视图数据变化
   * @param {DataChangeEvent} args
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-10-16 17:20:45
   */
  onViewDataChange(args: DataChangeEvent, id: string): void {
    // 新建的保存成功后该部件需要保存来更新数据
    if (args.eventName === 'onSaveSuccess') {
      this.handleDataChange(args.data[0] as ControlVO, id);
    }
  }

  /**
   * 处理数据变化
   *
   * @param {ControlVO} data
   * @returns {*}  {Promise<void>}
   */
  async handleDataChange(data: ControlVO, id: string): Promise<void> {
    const panelUiItemIndex = this.state.panelUiItems.findIndex(
      item => item.id === id,
    );
    if (panelUiItemIndex < 0) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.control.meditViewPanel.dataExist'),
      );
    }
    const tempUiItem = this.state.panelUiItems[panelUiItemIndex];
    if (tempUiItem.id.startsWith('mockId:')) {
      this.state.panelUiItems[panelUiItemIndex] =
        this.handlePanelItemParams(data);
    } else {
      tempUiItem.srfmajortext = data.srfmajortext!;
    }
    if (this.model.panelStyle === 'TAB_TOP') {
      // 上分页保存后激活保存的这一个
      this.state.activeTab = this.state.panelUiItems[panelUiItemIndex].id;
    }
  }

  /**
   * @description 切换标签页
   * @param {string} name
   * @memberof MEditViewPanelController
   */
  onTabChange(name: string): void {
    const data = this.state.panelUiItems.find(item => item.id === name);
    this.evt.emit('onTabChange', { data });
  }

  /**
   * @description 监听视图创建
   * @param {EventBase} event
   * @memberof MEditViewPanelController
   */
  onViewCreated(event: EventBase, id: string): void {
    const { view } = event;
    this.embedViews.set(id, view);
    view.evt.on('onDestroyed', () => {
      this.embedViews.delete(id);
    });
  }

  /**
   * @description 获取激活视图控制器
   * @returns {*}  {(IViewController | undefined)}
   * @memberof MEditViewPanelController
   */
  getActiveView(): IViewController | undefined {
    return this.embedViews.get(this.state.activeTab);
  }

  /**
   * @description 检测实体数据变更，子视图数据变更不应该触发列表加载
   * @protected
   * @param {IPortalMessage} _msg
   * @memberof MEditViewPanelController
   */
  protected onDEDataChange(_msg: IPortalMessage): void {
    ibiz.log.debug(
      ibiz.i18n.t('runtime.controller.control.meditViewPanel.ignoreDataChange'),
    );
  }

  /**
   * @description 保存数据
   * @param {IApiFormSaveParams} [args]
   * @returns {*}  {Promise<IApiData[]>}
   * @memberof MEditViewPanelController
   */
  async save(args: IApiFormSaveParams = { silent: true }): Promise<IApiData[]> {
    if (this.state.panelUiItems.length === 0) {
      return [];
    }
    const allViews = this.state.panelUiItems.map(item => {
      return this.embedViews.get(item.id);
    });
    if (allViews.length === 0) {
      return [];
    }
    const result = await Promise.all(
      allViews.map(async view => {
        return view?.call(SysUIActionTag.SAVE, args);
      }),
    );
    return result.flatMap(r => r?.data ?? []);
  }
}
