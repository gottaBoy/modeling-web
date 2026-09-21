import Sortable from 'sortablejs';
import {
  ref,
  VNode,
  watch,
  PropType,
  onMounted,
  onUnmounted,
  defineComponent,
} from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { TabsPaneContext } from 'element-plus';
import { IPanelRawItem } from '@ibiz/model-core';
import { showTitle } from '@ibiz-template/core';
import ContextMenu, { MenuItem } from '@imengyu/vue3-context-menu';
import { NavTabsController } from './nav-tabs.controller';
import {
  CloseAll,
  CloseLeft,
  CloseRight,
  CloseOther,
  CloseCurrent,
} from './icon';
import './nav-tabs.scss';

interface IAction {
  /**
   * @description 行为名称
   * @type {string}
   * @memberof IAction
   */
  label?: string;
  /**
   * @description 行为标识
   * @type {string}
   * @memberof IAction
   */
  value?: string;
  /**
   * @description 图标
   * @type {VNode}
   * @memberof IAction
   */
  icon?: VNode;
  /**
   * @description 类型
   * @type {('SEPERATOR' | 'ACTION')}（分割项 | 行为项）
   * @memberof IAction
   */
  type: 'SEPERATOR' | 'ACTION';
}

/**
 * 分页导航
 * @primary
 * @description 首页下的分页导航标签，使用el-tabs组件将所有打开的视图进行tab分页展示，点击可快速切换。
 */
export const NavTabs = defineComponent({
  name: 'IBizNavTabs',
  props: {
    /**
     * @description 分页导航模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 分页导航控制器
     */
    controller: {
      type: NavTabsController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('nav-tabs');
    const c = props.controller;
    const { state } = props.controller;
    const tabsRef = ref<IData | null>(null);
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    let sortable: Sortable | undefined;

    // 下拉菜单项
    const actions: IAction[] = [
      {
        type: 'ACTION',
        value: 'current',
        icon: CloseCurrent,
        label: ibiz.i18n.t('panelComponent.navTabs.closeCurrent'),
      },
      {
        type: 'SEPERATOR',
      },
      {
        type: 'ACTION',
        value: 'left',
        icon: CloseLeft,
        label: ibiz.i18n.t('panelComponent.navTabs.closeLeft'),
      },
      {
        type: 'ACTION',
        value: 'right',
        icon: CloseRight,
        label: ibiz.i18n.t('panelComponent.navTabs.closeRight'),
      },
      {
        type: 'SEPERATOR',
      },
      {
        type: 'ACTION',
        value: 'other',
        icon: CloseOther,
        label: ibiz.i18n.t('panelComponent.navTabs.closeOther'),
      },
      {
        type: 'ACTION',
        value: 'all',
        icon: CloseAll,
        label: ibiz.i18n.t('panelComponent.navTabs.closeAll'),
      },
    ];

    watch(
      () => c.state.currentKey,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const findItem = c.findTabItem(newVal);
          // 如果tabItems里有说明是路由切换
          if (findItem) {
            state.activeTab = newVal;
          }
        }
      },
    );

    /**
     * @description 切换tab
     * @param {TabsPaneContext} pane
     */
    const changePage = (pane: TabsPaneContext): void => {
      if (state.currentKey !== pane.paneName) {
        c.onTabClick(pane.paneName as string);
      }
    };

    /**
     * @description 删除tab
     * @param {string} key
     */
    const onTabRemove = (key: string): void => {
      c.onTabRemove('current', key);
    };

    /**
     * @description 右键菜单
     * @param {MouseEvent} evt
     */
    const onContextmenu = (evt: MouseEvent): void => {
      // 获取实际点击的目标元素
      let target = evt.target as HTMLDivElement;

      // 向上查找包含 'el-tabs__item' 类名的元素
      while (target && !target.classList?.contains('el-tabs__item')) {
        target = target.parentElement as HTMLDivElement;
        // 没找到，退出
        if (!target) return;
      }
      const length = c.state.tabItems.length;
      const key = target.id.replace('tab-', '');
      const index = c.state.tabItems.findIndex(tab => tab.key === key);
      if (index === -1) return;

      evt.stopPropagation();
      evt.preventDefault();
      const menus: MenuItem[] = [];

      actions.forEach(action => {
        // 处理分隔符
        if (action.type === 'SEPERATOR') {
          menus.push({ divided: 'self' });
        }

        // 处理行为
        if (action.type === 'ACTION') {
          const { value, label } = action;
          // 计算禁用条件
          // 1. 仅有一项时，禁止关闭左侧/右侧/其他
          // 2. 首项禁止关闭左侧
          // 3. 最后一项禁止关闭右侧
          const disabled =
            (length === 1 &&
              value &&
              ['left', 'right', 'other'].includes(value)) ||
            (index === 0 && value === 'left') ||
            (index === length - 1 && value === 'right');

          menus.push({
            label,
            disabled,
            clickClose: true,
            icon: action.icon,
            customClass: ns.em('context-menu', 'item'),
            onClick: () => c.onTabRemove(value!, key),
          });
        }
      });
      if (!menus.length) return;
      const theme = ibiz.util.theme.getTheme();
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        items: menus,
        theme: theme.includes('dark') ? 'default dark' : 'default',
        customClass: ns.e('context-menu'),
      });
    };

    /**
     * @description 初始化Sortable
     */
    const initSortable = (): void => {
      const container = tabsRef.value?.$el?.querySelector(
        '.el-tabs__header .el-tabs__nav',
      );
      if (container)
        sortable = Sortable.create(container, {
          animation: 150, // 动画时长
          ghostClass: 'sortable-ghost', // 拖拽时的样式类
          onEnd: event => {
            const { oldIndex, newIndex } = event;
            if (
              oldIndex !== undefined &&
              newIndex !== undefined &&
              oldIndex !== newIndex
            )
              c.onTabOrder(oldIndex, newIndex);
          },
        });
    };

    onMounted(() => {
      initSortable();
    });

    onUnmounted(() => {
      sortable?.destroy();
    });

    return {
      ns,
      actions,
      tabsRef,
      changePage,
      onTabRemove,
      onContextmenu,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    const { state } = this.controller;
    if (ibiz.config.view.disableHomeTabs) return;
    return (
      <div
        class={[
          this.ns.b(),
          this.semanticClass('root'),
          ...this.controller.containerClass,
        ]}
        style={this.semanticStyle('root')}
      >
        <el-tabs
          closable
          type='card'
          ref='tabsRef'
          v-model={state.activeTab}
          onTabClick={this.changePage}
          onTabRemove={this.onTabRemove}
          onContextmenu={this.onContextmenu}
        >
          {state.tabItems.map(msg => {
            const label = msg.dataInfo
              ? `${msg.caption} - ${msg.dataInfo}`
              : msg.caption;
            return (
              <el-tab-pane key={msg.key} label={label} name={msg.key}>
                {{
                  label: (): VNode => {
                    return (
                      <div
                        class={[
                          this.ns.e('item'),
                          this.semanticClass('item', { item: msg }),
                        ]}
                        style={this.semanticStyle('item', { item: msg })}
                      >
                        <iBizIcon
                          icon={msg.sysImage}
                          class={[
                            this.ns.em('item', 'icon'),
                            this.semanticClass('item.icon', { item: msg }),
                          ]}
                          style={this.semanticStyle('item.icon', { item: msg })}
                        />
                        <div
                          title={showTitle(label)}
                          class={[
                            this.ns.em('item', 'caption'),
                            this.semanticClass('item.caption', { item: msg }),
                          ]}
                          style={this.semanticStyle('item.caption', {
                            item: msg,
                          })}
                        >
                          <span
                            class={[
                              this.ns.em('item', 'captioninfo'),
                              this.semanticClass('item.captioninfo', {
                                item: msg,
                              }),
                            ]}
                            style={this.semanticStyle('item.captioninfo', {
                              item: msg,
                            })}
                          >
                            {msg.caption}
                          </span>
                          {msg.dataInfo && (
                            <span
                              class={[
                                this.ns.em('item', 'captiondivider'),
                                this.semanticClass('item.captiondivider', {
                                  item: msg,
                                }),
                              ]}
                              style={this.semanticStyle('item.captiondivider', {
                                item: msg,
                              })}
                            >
                              &nbsp;-&nbsp;
                            </span>
                          )}
                          {msg.dataInfo && (
                            <span
                              class={[
                                this.ns.em('item', 'datainfo'),
                                this.semanticClass('item.datainfo', {
                                  item: msg,
                                }),
                              ]}
                              style={this.semanticStyle('item.datainfo', {
                                item: msg,
                              })}
                            >
                              {msg.dataInfo}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  },
                }}
              </el-tab-pane>
            );
          })}
        </el-tabs>
      </div>
    );
  },
});
