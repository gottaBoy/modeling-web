import { IAppMenuItem } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { AppMenuController, formatSeparator } from '@ibiz-template/runtime';
import { ref, VNode, PropType, onMounted, defineComponent } from 'vue';
import { showTitle } from '@ibiz-template/core';
import './custom-menu-design.scss';

interface IMenuItemDesign {
  /**
   * @description 标识
   * @type {string}
   * @memberof IMenuItemDesign
   */
  key: string;
  /**
   * @description 名称
   * @type {string}
   * @memberof IMenuItemDesign
   */
  name: string;
  /**
   * @description 类型
   * @type {string}
   * @memberof IMenuItemDesign
   */
  type: string;
  /**
   * @description 是否显示
   * @type {boolean}
   * @memberof IMenuItemDesign
   */
  visible: boolean;
  /**
   * @description 子菜单
   * @type {IMenuItemDesign[]}
   * @memberof IMenuItemDesign
   */
  children?: IMenuItemDesign[];
}

interface IMenuItemConfig extends IMenuItemDesign {
  /**
   * @description 菜单模型
   * @type {IAppMenuItem}
   * @memberof IMenuItemConfig
   */
  model: IAppMenuItem;
  /**
   * @description 是否折叠
   * @type {boolean}
   * @memberof IMenuItemConfig
   */
  isCollapse: boolean;
  /**
   * @description 子菜单配置
   * @type {IMenuItemConfig[]}
   * @memberof IMenuItemConfig
   */
  children?: IMenuItemConfig[];
}

/**
 * 处理菜单自定义配置
 *
 * @param {AppMenuController} c
 * @param {IData[]} items
 * @return {*}
 */
export const MenuDesign = defineComponent({
  name: 'IBizMenuDesign',
  props: {
    controller: {
      type: Object as PropType<AppMenuController>,
      required: true,
    },
  },
  emits: ['saved', 'reset'],
  setup(props, { emit }) {
    const ns = useNamespace(`menu-design`);
    const c = props.controller;

    const loading = ref(false);

    const visible = ref(false); // 抽屉是否显示

    const configs = ref<IMenuItemConfig[]>([]); // 合并配置后的菜单模型

    const hideSeparator = ref<string[]>([]);

    onMounted(() => {
      hideSeparator.value = formatSeparator(
        'APPMENU',
        c.model.appMenuItems,
        c.state.menuItemsState,
      );
    });

    /**
     * @description 处理菜单自定义配置保存数据
     * @param {IMenuItemConfig[]} items
     * @returns {*}
     */
    const handleMenusSaveData = (
      items: IMenuItemConfig[],
    ): IMenuItemDesign[] => {
      const result: IMenuItemDesign[] = [];
      items.forEach(item => {
        const config: IMenuItemDesign = {
          key: item.key,
          name: item.name,
          type: item.type,
          visible: item.visible,
        };
        if (item.children?.length) {
          config.children = handleMenusSaveData(item.children);
        }
        result.push(config);
      });
      return result;
    };

    /**
     * @description 折叠分组
     * @param {IMenuItemConfig} menu
     */
    const collapseGroup = (menu: IMenuItemConfig): void => {
      menu.isCollapse = !menu.isCollapse;
    };

    /**
     * @description 平铺配置项
     * @param {IData[]} items
     * @returns {*}  {IMenuItemDesign[]}
     */
    const flattenConfigs = (items: IData[]): IMenuItemDesign[] => {
      const result: IMenuItemDesign[] = [];
      items.forEach(item => {
        result.push(item as IMenuItemDesign);
        if (item.children && item.children.length > 0) {
          const tempResult = flattenConfigs(item.children);
          result.push(...tempResult);
        }
      });
      return result;
    };

    /**
     * @description 合并菜单自定义配置
     * @param {IAppMenuItem[]} menus 菜单模型
     * @param {IMenuItemDesign[]} config 自定义配置
     * @returns {*}
     */
    const mergeMenusConfig = (
      menus: IAppMenuItem[],
      custom: IMenuItemDesign[],
    ): IMenuItemConfig[] => {
      return menus.map(menu => {
        const config = custom.find(cof => {
          return menu.id === cof.key;
        });
        const data: IMenuItemConfig = {
          key: menu.id!,
          name: menu.caption!,
          type: menu.itemType!,
          model: menu,
          isCollapse: true,
          visible: config ? config.visible : true,
        };
        if (menu.appMenuItems?.length)
          data.children = mergeMenusConfig(menu.appMenuItems, custom);
        return data;
      });
    };

    /**
     * @description 恢复默认
     */
    const onReset = async (): Promise<void> => {
      c.saveConfigs = [];
      await c.customController!.resetCustomModelData();
      configs.value = mergeMenusConfig(c.model.appMenuItems || [], []);
      emit('reset');
    };

    /**
     * @description 保存配置
     */
    const onSave = async (): Promise<void> => {
      loading.value = true;
      const saveConfig: IData[] = handleMenusSaveData(configs.value);
      await c.customController!.saveCustomModelData(saveConfig);
      c.saveConfigs = saveConfig;
      loading.value = false;
      emit('saved', saveConfig);
    };

    /**
     * @description 打开弹窗
     * @returns {*}
     */
    const openDesign = (): void => {
      if (c.runMode === 'DESIGN') return;
      hideSeparator.value = formatSeparator(
        'APPMENU',
        c.model.appMenuItems,
        c.state.menuItemsState,
      );
      const customConfig = c.saveConfigs?.length
        ? flattenConfigs(c.saveConfigs)
        : [];
      configs.value = mergeMenusConfig(
        c.model.appMenuItems || [],
        customConfig,
      );
      visible.value = true;
    };

    // 绘制菜单项
    const renderMenuItem = (config: IMenuItemConfig): VNode | undefined => {
      if (
        !c.state.menuItemsState[config.key]?.visible ||
        hideSeparator.value.includes(config.key)
      )
        return;
      const { itemType, sysImage, caption } = config.model;
      if (itemType === 'MENUITEM') {
        let content = null;
        const provider = c.itemProviders[config.key];
        if (provider && provider.renderText) {
          content = provider.renderText(config.model, c);
        } else {
          content = [
            sysImage ? (
              <iBizIcon class={ns.e('icon')} icon={sysImage}></iBizIcon>
            ) : null,
            <span>{caption}</span>,
          ];
        }
        return content;
      }
      if (itemType === 'SEPERATOR') {
        const direction =
          c.view.model.mainMenuAlign === 'TOP' ? 'vertical' : 'horizontal';
        return (
          <div class={ns.be('content', 'menu-seperator')}>
            <el-divider
              id={config.key}
              direction={direction}
              class={ns.e('separator')}
            />
          </div>
        );
      }
    };

    // 绘制分组图标
    const renderGroupIcon = (item: IMenuItemConfig) => {
      if (item.children && item.children.length > 0) {
        if (item.isCollapse)
          return (
            <i
              class={[
                ns.be('menu-set-drawer', 'group-icon'),
                'fa fa-caret-right',
              ]}
              aria-hidden='true'
            ></i>
          );
        return (
          <i
            class={[ns.be('menu-set-drawer', 'group-icon'), 'fa fa-sort-down']}
            aria-hidden='true'
          ></i>
        );
      }
      return null;
    };

    // 绘制菜单项列表树
    const renderMenuList = (items: IMenuItemConfig[]) => {
      return items.map(item => {
        const content = renderMenuItem(item);
        if (!content) return null;
        const { itemType } = item.model;
        return (
          <div class={ns.be('content', 'menu-item')}>
            <div
              class={[
                ns.be('content', 'menu-item-content'),
                ns.is('is-menuitem', itemType === 'MENUITEM'),
              ]}
            >
              <div
                class={ns.bem('content', 'menu-item-content', 'label')}
                onClick={() => collapseGroup(item)}
              >
                {renderGroupIcon(item)}
                <div
                  class={ns.bem(
                    'content',
                    'menu-item-content',
                    'label-content',
                  )}
                >
                  {content}
                </div>
              </div>
              {itemType !== 'SEPERATOR' ? (
                <div class={ns.bem('content', 'menu-item-content', 'checks')}>
                  <el-checkbox
                    size='large'
                    v-model={item.visible}
                    label={ibiz.i18n.t('control.menuDesign.visible')}
                    onClick={(event: MouseEvent) => event.stopPropagation()}
                  />
                </div>
              ) : null}
            </div>
            {item.children?.length ? (
              <div
                class={[
                  ns.bem('content', 'menu-item', 'children'),
                  ns.is('collapse', item.isCollapse),
                ]}
              >
                {renderMenuList(item.children)}
              </div>
            ) : null}
          </div>
        );
      });
    };

    // 弹窗头部
    const renderHeader = () => {
      return (
        <div class={ns.b('header')}>
          <div class={ns.be('header', 'caption')}>
            {ibiz.i18n.t('control.menuDesign.customMenu')}
          </div>
          <div class={ns.be('header', 'actions')}>
            <el-button onClick={onReset} loading={loading.value}>
              {ibiz.i18n.t('control.menuDesign.reset')}
            </el-button>
            <el-button onClick={onSave} loading={loading.value}>
              {ibiz.i18n.t('control.menuDesign.save')}
            </el-button>
          </div>
        </div>
      );
    };

    // 绘制菜单内容
    const renderContent = () => {
      return <div class={ns.b('content')}>{renderMenuList(configs.value)}</div>;
    };

    return {
      c,
      ns,
      configs,
      visible,
      loading,
      onSave,
      onReset,
      openDesign,
      renderHeader,
      renderContent,
    };
  },

  render() {
    return (
      <div class={this.ns.b()}>
        <div
          onClick={this.openDesign}
          title={showTitle(ibiz.i18n.t('control.menu.menuSetting'))}
        >
          <svg
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            width='1em'
            preserveAspectRatio='xMidYMid meet'
            focusable='false'
            fill='currentColor'
          >
            <g id='augaction/settings' stroke-width='1' fill-rule='evenodd'>
              <path
                d='M11.405 13.975l3.398-5.889L11.405 2.2H4.607L1.208 8.087l3.399 5.889h6.798zm1.023-12.4l3.43 5.938c.205.356.205.793 0 1.149l-3.43 5.938a1.147 1.147 0 0 1-.993.574H4.577c-.41 0-.789-.218-.994-.573L.153 8.66a1.153 1.153 0 0 1 0-1.147l3.43-5.94c.205-.356.584-.575.994-.575h6.858c.409 0 .788.22.993.576zM8.006 9.879c.988 0 1.792-.804 1.792-1.792s-.804-1.792-1.792-1.792-1.792.804-1.792 1.792.804 1.792 1.792 1.792zm0-4.784a2.993 2.993 0 1 1-.002 5.985 2.993 2.993 0 0 1 .002-5.985z'
                id='aug形状结合'
              ></path>
            </g>
          </svg>
        </div>
        <el-drawer
          append-to-body
          v-model={this.visible}
          custom-class={this.ns.b('menu-set-drawer')}
        >
          {{
            default: () => {
              return this.renderContent();
            },
            header: () => {
              return this.renderHeader();
            },
          }}
        </el-drawer>
      </div>
    );
  },
});
