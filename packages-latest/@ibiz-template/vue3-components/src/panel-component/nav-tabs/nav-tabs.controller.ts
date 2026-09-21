import { nextTick } from 'vue';
import { isNil, reject } from 'ramda';
import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem, ISysImage } from '@ibiz/model-core';
import { NavPosIndexController } from '../nav-pos-index';
import { NavTabsState, TabMsg } from './nav-tabs.state';

/**
 * 导航占位控制器
 *
 * @export
 * @class NavTabsController
 * @extends {PanelItemController}
 */
export class NavTabsController extends PanelItemController<IPanelRawItem> {
  declare state: NavTabsState;

  protected createState(): NavTabsState {
    return new NavTabsState(this.parent?.state);
  }

  /**
   * @description 当前视图的路由层级，非路由模式不存在。
   * @exposedoc
   * @readonly
   */
  get routeDepth(): number | undefined {
    return this.panel.view.modal.routeDepth;
  }

  /**
   * @description 导航占位控制器
   * @exposedoc
   * @readonly
   * @type {(NavPosIndexController | undefined)}
   */
  get navPos(): NavPosIndexController | undefined {
    return this.panel.panelItems.nav_pos_index as NavPosIndexController;
  }

  /**
   * @description 获取tabItem
   * @exposedoc
   * @param {string} key
   * @return {*}
   */
  findTabItem(key: string): TabMsg | undefined {
    return this.state.tabItems.find(item => item.key === key);
  }

  /**
   * @description 通过视图标识获取tabItem
   * @exposedoc
   * @param {string} key
   * @return {*}  {(TabMsg | undefined)}
   * @memberof NavTabsController
   */
  findTabItemByViewKey(key: string): TabMsg | undefined {
    return this.state.tabItems.find(item => item.viewKey === key);
  }

  /**
   * 点击处理
   * @author lxm
   * @date 2023-05-25 01:31:04
   * @param {string} key
   */
  onTabClick(key: string): void {
    this.navPos?.changeView(key);
  }

  /**
   * 更新视图信息
   *
   * @param {string} key
   * @param {{
   *       viewKey: string;
   *       caption?: string;
   *       dataInfo?: string;
   *       sysImage?: ISysImage;
   *     }} info
   * @memberof NavTabsController
   */
  updateViewInfo(
    key: string,
    info: {
      viewKey?: string;
      caption?: string;
      dataInfo?: string;
      sysImage?: ISysImage;
    },
  ): void {
    const findItem = info.viewKey
      ? this.findTabItemByViewKey(info.viewKey)
      : this.findTabItem(key);
    if (findItem) {
      Object.assign(findItem, reject(isNil, info));
      this.refreshItemUI(key);
    } else {
      this.state.tabItems.push({ key, ...info });
      this.state.activeTab = this.state.currentKey;
    }
  }

  /**
   * @description 删除某个key对应的数据，仅处理组件自身维护的数据
   * @exposedoc
   * @param {string} key
   */
  removeCache(key: string): void {
    const findIndex = this.state.tabItems.findIndex(item => item.key === key);
    if (findIndex !== -1) {
      this.state.tabItems.splice(findIndex, 1);
    }
  }

  /**
   * @description 签页删除标
   * @param {string} actionName 行为名称
   * @param {string} key 标签页标识
   * @memberof NavTabsController
   */
  onTabRemove(actionName: string, key: string): void {
    let removeKeys: string[] = [];
    const { tabItems, activeTab } = this.state;
    const index = tabItems.findIndex(tab => tab.key === key);
    const activeIndex = tabItems.findIndex(tab => tab.key === activeTab);
    switch (actionName) {
      case 'current':
        removeKeys.push(key);
        break;
      case 'left':
        // 如果激活页在左侧，则激活当前分页
        if (activeIndex < index) this.onTabClick(key);
        removeKeys = tabItems.slice(0, index).map(tab => tab.key);
        break;
      case 'right':
        // 如果激活页在右侧，则激活当前分页
        if (activeIndex > index) this.onTabClick(key);
        removeKeys = tabItems.slice(index + 1).map(tab => tab.key);
        break;
      case 'other':
        removeKeys = tabItems
          .filter(tab => tab.key !== key)
          .map(tab => tab.key);
        break;
      case 'all':
        removeKeys = tabItems.map(tab => tab.key);
        break;
      default:
        break;
    }
    if (removeKeys.length) this.navPos?.closeViewByKeys(removeKeys);
  }

  /**
   * @description 标签页排序
   * @param {number} oldIndex
   * @param {number} newIndex
   * @memberof NavTabsController
   */
  onTabOrder(oldIndex: number, newIndex: number): void {
    const newTabs = [...this.state.tabItems];
    const [movedItem] = newTabs.splice(oldIndex, 1);
    newTabs.splice(newIndex, 0, movedItem);
    this.state.tabItems = newTabs;
  }

  /**
   * @description 刷新项（解决主信息更新之后界面ui未刷新）
   * @exposedoc
   * @param {string} key
   * @memberof NavTabsController
   */
  public refreshItemUI(key: string): void {
    const tempItem = {
      key: 'exampleItem',
      caption: '',
    };
    this.state.tabItems.push(tempItem);
    this.state.activeTab = tempItem.key;
    nextTick(() => {
      this.state.tabItems.pop();
      this.state.activeTab = key;
    });
  }
}
