/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { notNilEmpty } from 'qx-util';
import {
  getControl,
  IAppService,
  AppFuncCommand,
  calcDynamicMenu,
  IViewController,
  PanelItemController,
  IAppMenuItemProvider,
  getAppMenuItemProvider,
} from '@ibiz-template/runtime';
import { IAppMenu, IAppMenuItem, IPanelRawItem } from '@ibiz/model-core';
import { recursiveIterate, RuntimeModelError } from '@ibiz-template/core';
import { ExtendMenuBase } from './extend-menu-base.state';

/**
 * @description 扩展菜单状态控制器基类
 * @export
 * @class ExtendMenuBaseController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export class ExtendMenuBaseController extends PanelItemController<IPanelRawItem> {
  /**
   * @description 状态对象
   * @type {ExtendMenuBase}
   * @memberof AppSwitchController
   */
  declare state: ExtendMenuBase;

  /**
   * @description 自定义补充参数
   * @type {IData}
   * @memberof ExtendMenuBaseController
   */
  rawItemParams: IData = { rendermode: 'BUTTON' };

  /**
   * @description 当前菜单名称
   * @protected
   * @type {string}
   * @memberof ExtendMenuBaseController
   */
  protected appMenuName: string = '';

  /**
   * @description 菜单模型
   * @protected
   * @type {(IAppMenu | undefined)}
   * @memberof ExtendMenuBaseController
   */
  appMenu: IAppMenu | undefined;

  /**
   * @description 当前应用
   * @protected
   * @type {IAppService}
   * @memberof ExtendMenuBaseController
   */
  protected app!: IAppService;

  /**
   * @description 菜单项适配器集合
   * @type {{ [key: string]: IAppMenuItemProvider }}
   * @memberof ExtendMenuBaseController
   */
  itemProviders: { [key: string]: IAppMenuItemProvider } = {};

  /**
   * @description 所有菜单项，平铺开
   * @type {IAppMenuItem[]}
   * @memberof ExtendMenuBaseController
   */
  allAppMenuItems: IAppMenuItem[] = [];

  /**
   * @description 获取当前视图
   * @readonly
   * @type {IViewController}
   * @memberof ExtendMenuBaseController
   */
  get view(): IViewController {
    return this.panel.view;
  }

  /**
   * @description 视图层级
   * @readonly
   * @type {(number | undefined)}
   * @memberof ExtendMenuBaseController
   */
  get routeDepth(): number | undefined {
    return this.view.modal.routeDepth;
  }

  /**
   * @description 上下文对象
   * @readonly
   * @type {IContext}
   * @memberof ExtendMenuBaseController
   */
  get context(): IContext {
    return this.panel.context;
  }

  /**
   * @description 视图参数
   * @readonly
   * @type {IParams}
   * @memberof ExtendMenuBaseController
   */
  get params(): IParams {
    return this.panel.params;
  }

  /**
   * @description 创建状态对象
   * @protected
   * @returns {*}  {ExtendMenuBase}
   * @memberof ExtendMenuBaseController
   */
  protected createState(): ExtendMenuBase {
    return new ExtendMenuBase(this.parent?.state);
  }

  /**
   * @description 初始化
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof ExtendMenuBaseController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    this.handleRawItemParams();
    this.app = await ibiz.hub.getApp(this.context.srfappid);
    this.appMenu = this.computeAppMenu();
    if (this.appMenu)
      await calcDynamicMenu(
        this.appMenu,
        this.panel.context,
        this.panel.params,
      );
    this.convertMultipleLanguages();
    this.state.items =
      this.appMenu && this.appMenu.appMenuItems
        ? this.appMenu.appMenuItems
        : [];
    this.flattenAllItems();
    await this.initAppMenuItemProviders();
    this.state.items.forEach(item => {
      this.initMenuItemState(item);
    });
  }

  /**
   * @description 计算当前菜单模型
   * @protected
   * @returns {*}  {(IAppMenu | undefined)}
   * @memberof ExtendMenuBaseController
   */
  protected computeAppMenu(): IAppMenu | undefined {
    return getControl(this.view.model, this.appMenuName);
  }

  /**
   * @description 平铺所有菜单项
   * @protected
   * @returns {*}  {void}
   * @memberof ExtendMenuBaseController
   */
  protected flattenAllItems(): void {
    if (!this.appMenu) return;
    const result: IAppMenuItem[] = [];
    const flattenMenus = (menuItems: IAppMenuItem[]): void => {
      menuItems.forEach(item => {
        result.push(item);
        if (item.appMenuItems && item.appMenuItems.length > 0) {
          flattenMenus(item.appMenuItems);
        }
      });
    };
    flattenMenus(this.appMenu.appMenuItems || []);
    this.allAppMenuItems = result;
  }

  /**
   * @description 初始化菜单项的适配器
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof ExtendMenuBaseController
   */
  protected async initAppMenuItemProviders(): Promise<void> {
    if (this.allAppMenuItems.length === 0) return;
    await Promise.all(
      this.allAppMenuItems.map(async item => {
        const provider = await getAppMenuItemProvider(item, this.appMenu!);
        if (provider) {
          this.itemProviders[item.id!] = provider;
        }
      }),
    );
  }

  /**
   * @description 初始化菜单项状态
   * @param {IAppMenuItem} menu
   * @returns {*}  {{
   *     visible: boolean;
   *     permitted: boolean;
   *   }}
   * @memberof ExtendMenuBaseController
   */
  initMenuItemState(menu: IAppMenuItem): {
    visible: boolean;
    permitted: boolean;
  } {
    const result = { permitted: true, visible: true };
    if (menu.hidden) {
      result.visible = false;
    } else {
      let permitted = true;
      if (menu.accessKey) {
        permitted = this.app.authority.calcByResCode(menu.accessKey);
      }
      let visible = permitted;
      // 有子的计算子状态，如果本身显示但是子都不显示则不显示
      if (menu.appMenuItems?.length) {
        const childrenState = menu.appMenuItems.map(child => {
          return this.initMenuItemState(child).visible;
        });
        visible = visible && childrenState.includes(true);
      }
      result.permitted = permitted;
      result.visible = visible;
    }
    this.state.menuItemsState[menu.id!] = result;
    return result;
  }

  /**
   * @description 处理菜单项点击，触发对应的应用功能
   * @param {IAppMenuItem} menuItem
   * @param {MouseEvent} event
   * @param {boolean} [useDepth=true]
   * @returns {*}  {Promise<void>}
   * @memberof ExtendMenuBaseController
   */
  async handleClickMenuItem(
    menuItem: IAppMenuItem,
    event: MouseEvent,
    useDepth: boolean = true,
  ): Promise<void> {
    if (!menuItem) {
      return;
    }
    // 如果有适配器，走适配器的点击处理
    const provider = this.itemProviders[menuItem.id!];
    if (provider && provider.onClick) {
      return provider.onClick(menuItem, event as MouseEvent);
    }

    if (!menuItem.appFuncId) {
      throw new RuntimeModelError(
        menuItem,
        ibiz.i18n.t('runtime.controller.control.menu.noConfigured'),
      );
    }

    const tempContext = this.context.clone();
    tempContext.srfappid = menuItem.appId || ibiz.env.appId;
    if (this.routeDepth && useDepth) {
      Object.assign(tempContext, {
        toRouteDepth: this.routeDepth + 1,
      });
    }
    const param = { ...this.params };
    await ibiz.commands.execute(
      AppFuncCommand.TAG,
      menuItem.appFuncId,
      tempContext,
      param,
      { view: this.view },
    );
  }

  /**
   * @description 处理自定义补充参数
   * @protected
   * @memberof ExtendMenuBaseController
   */
  protected handleRawItemParams(): void {
    let params = {};
    const rawItemParams = this.model.rawItem?.rawItemParams;
    if (notNilEmpty(rawItemParams)) {
      params = rawItemParams!.reduce((param: IData, item) => {
        param[item.key!.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
  }

  /**
   * @description 转换各类多语言
   * @protected
   * @memberof ExtendMenuBaseController
   */
  protected convertMultipleLanguages(): void {
    recursiveIterate(
      this.appMenu || {},
      (item: IAppMenuItem) => {
        if (item.capLanguageRes?.lanResTag)
          item.caption = ibiz.i18n.t(
            item.capLanguageRes.lanResTag,
            item.caption,
          );
        if (item.tooltipLanguageRes?.lanResTag)
          item.tooltip = ibiz.i18n.t(
            item.tooltipLanguageRes.lanResTag,
            item.tooltip,
          );
      },
      {
        childrenFields: ['appMenuItems'],
      },
    );
  }
}
