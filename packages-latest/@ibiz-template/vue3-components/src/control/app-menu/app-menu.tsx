/* eslint-disable no-use-before-define */
import { showTitle } from '@ibiz-template/core';
import {
  useNamespace,
  route2routePath,
  useControlController,
  useSemanticNode,
} from '@ibiz-template/vue3-util';
import { IAppMenuItem, IAppMenu, IAppMenuRawItem } from '@ibiz/model-core';
import {
  Ref,
  ref,
  watch,
  computed,
  nextTick,
  PropType,
  onMounted,
  defineComponent,
} from 'vue';
import { createUUID } from 'qx-util';
import {
  ViewCallTag,
  ScriptFactory,
  formatSeparator,
  IControlProvider,
  AppMenuController,
  filterPresetAttrs,
} from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';
import { MenuDesign } from './custom-menu-design/custom-menu-design';
import './app-menu.scss';

/**
 * @description 绘制成员的attrs
 * @param {IAppMenu} model
 * @param {IParams} params
 * @returns {*}  {IParams}
 */
function renderAttrs(model: IAppMenu, params: IParams): IParams {
  const attrs: IParams = {};
  filterPresetAttrs(model.controlAttributes).forEach(item => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName!] = ScriptFactory.execSingleLine(item.attrValue!, {
        ...params,
      });
    }
  });
  return attrs;
}

function findCustomMenu(_key: string, items: IData[]): IData | undefined {
  let temp: IData | undefined;
  if (items) {
    items.some((item: IData): boolean => {
      if (item.key === _key) {
        temp = item;
        return true;
      }
      if (item.children && item.children.length > 0) {
        temp = findCustomMenu(_key, item.children);
        if (!temp) {
          return false;
        }
        return true;
      }
      return false;
    });
  }
  return temp;
}

/**
 * 获取菜单项自定义配置的显隐
 *
 * @param {string} _key
 * @param {IData[]} items
 * @return {*}
 */
function getMenuCustomVisible(
  _key: string,
  items: IData[],
  hideSeparator: string[],
) {
  // 如果当前项为隐藏的分隔符，则不绘制
  const tag = hideSeparator.includes(_key);
  if (tag) {
    return false;
  }
  const target = findCustomMenu(_key, items);
  if (target) {
    return target.visible;
  }
  return true;
}

export const AppMenuControl = defineComponent({
  name: 'IBizAppMenuControl',
  props: {
    /**
     * @description 菜单模型数据
     */
    modelData: { type: Object as PropType<IAppMenu>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description 是否折叠
     */
    collapse: { type: Boolean },
    /**
     * @description 当前路径（已弃用）
     */
    currentPath: { type: String },
  },
  setup(props) {
    const c: AppMenuController = useControlController(
      (...args) => new AppMenuController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const { semanticClass, semanticStyle } = useSemanticNode(c);

    const saveConfigs = ref<IData[]>([]);

    // 默认激活菜单项
    const defaultActive = ref('');
    // 默认展开菜单项数组
    const defaultOpens: Ref<string[]> = ref([]);
    // 路由对象
    const route = useRoute();

    const key = ref(createUUID());

    const menuRef = ref();

    const hasScroll = ref(false);

    const hideSeparator = ref<string[]>([]);

    // 计算当前路由匹配菜单
    const calcCurMenu = (): IAppMenuItem | undefined => {
      const allItems = c.getAllItems();
      return allItems.find(item => {
        if (item.itemType !== 'MENUITEM' || !item.appFuncId) return false;
        if (ibiz.config.appMenu.echoMode === 'VIEW') {
          const app = ibiz.hub.getApp(item.appId);
          if (!app) return false;
          const func = app.getAppFunc(item.appFuncId!);
          if (func && func.appViewId && route?.params.view2) {
            return func.appViewId.split('.')[1] === route.params.view2;
          }
        } else {
          if (!route) {
            return false;
          }
          const routePath = route2routePath(route);
          if (routePath.pathNodes.length > 1)
            return item.id === routePath.pathNodes[1].params?.srfmenuitem;
        }
        return false;
      });
    };

    const onClick = async (id: string, event?: MouseEvent): Promise<void> => {
      const activeMenu = calcCurMenu();
      // 如果点击的是当前的菜单项，拦截掉
      if (activeMenu && activeMenu.id === id) return;
      defaultActive.value = id;
      const menu = c.getAllItems().find(m => m.id === id);
      if (menu?.itemType === 'RAWITEM' || c.runMode === 'DESIGN') {
        return;
      }
      await c.onClickMenuItem(id, event);
    };

    // 监听二级路由参数，变化时计算当前激活菜单回显
    if (c.runMode !== 'DESIGN') {
      watch(
        () => route?.params.view2,
        (newVal, oldVal) => {
          if (newVal !== oldVal && ibiz.config.appMenu.enableEcho) {
            const activeMenu = calcCurMenu();
            defaultActive.value = activeMenu ? activeMenu.id! : '';
          }
        },
      );
    }

    c.evt.on('onCreated', async () => {
      saveConfigs.value = c.saveConfigs;
      // 默认激活的菜单项
      const defaultActiveMenuItem = c.getDefaultOpenMenuItem();
      if (
        defaultActiveMenuItem &&
        !route?.params.view2 &&
        !route?.fullPath.includes('404')
      ) {
        defaultActive.value = defaultActiveMenuItem.id!;
        onClick(defaultActive.value);
      } else if (ibiz.config.appMenu.enableEcho) {
        const activeMenu = calcCurMenu();
        defaultActive.value = activeMenu ? activeMenu.id! : '';
      }
      // 默认展开的菜单项数组
      const defaultOpensArr = c.getAllItems().filter(item => {
        return item.expanded && !item.hidden;
      });
      if (defaultOpensArr.length > 0) {
        defaultOpensArr.forEach(item => {
          defaultOpens.value.push(item.id!);
        });
      }
      hideSeparator.value = formatSeparator(
        'APPMENU',
        c.model.appMenuItems,
        c.state.menuItemsState,
        saveConfigs.value,
      );
    });

    const menuMode = computed(() => {
      const model = c.view.model.mainMenuAlign;
      switch (model) {
        case 'TOP':
          return 'horizontal';
        default:
          return 'vertical';
      }
    });

    // 计算菜单是否存在滚动条，防止折叠时图标未对齐
    const calcScroll = () => {
      if (menuRef.value && menuRef.value.$el.children) {
        const elMenu = menuRef.value.$el.children[0];
        if (elMenu) {
          hasScroll.value = elMenu.scrollHeight > elMenu.clientHeight;
        }
      }
    };

    onMounted(() => {
      calcScroll();
    });

    watch(
      () => props.collapse,
      () => {
        nextTick(() => {
          calcScroll();
        });
      },
      { immediate: true },
    );

    if (
      c.view.model.mainMenuAlign &&
      c.view.model.mainMenuAlign !== 'LEFT' &&
      c.view.model.mainMenuAlign !== 'TOP'
    ) {
      ibiz.message.warning(
        ibiz.i18n.t('control.menu.noSupportAlign', {
          align: c.view.model.mainMenuAlign,
        }),
      );
    }

    const isShowCollapse = computed(() => {
      if (
        c.view.model.mainMenuAlign === 'LEFT' ||
        c.view.model.mainMenuAlign === undefined
      ) {
        return true;
      }
      return false;
    });

    // 重新计算分隔符显隐
    const computeSeparator = () => {
      c.model.appMenuItems?.forEach((item: IAppMenuItem) => {
        c.initMenuItemState(item);
      });
      hideSeparator.value = formatSeparator(
        'APPMENU',
        c.model.appMenuItems,
        c.state.menuItemsState,
        saveConfigs.value,
      );
    };

    // 保存自定义配置
    const configSaves = (saveConfig: IData[]) => {
      saveConfigs.value = saveConfig;
      computeSeparator();
    };

    // 自定义配置恢复默认
    const configReset = () => {
      saveConfigs.value = [];
      computeSeparator();
    };

    // 省略svg(实心圆)
    const ellipsisSvg = () => {
      return <ion-icon name='ellipsis-horizontal'></ion-icon>;
    };

    /**
     * @description 绘制分组菜单
     * @param {IAppMenuItem} menu
     */
    const renderGroupmenu = (menu: IAppMenuItem) => {
      const {
        id = '',
        sysCss,
        caption,
        tooltip,
        sysImage,
        counterId,
        appMenuItems = [],
      } = menu;
      return (
        <el-menu-item-group
          title={showTitle(tooltip)}
          class={[
            ns.b('groupmenu'),
            semanticClass('groupmenu', { item: menu }),
            `${sysCss?.cssName || ''}`,
          ]}
          style={semanticStyle('groupmenu', { item: menu })}
        >
          {{
            title: () => {
              const provider = c.itemProviders[id];
              if (provider && provider.renderText)
                return provider.renderText(menu, c);
              return [
                sysImage && (
                  <iBizIcon
                    class={[
                      ns.e('icon'),
                      semanticClass('groupitem.icon', { item: menu }),
                    ]}
                    style={semanticStyle('groupitem.icon', { item: menu })}
                    icon={sysImage}
                  ></iBizIcon>
                ),
                <span
                  class={[
                    ns.e('caption'),
                    semanticClass('groupitem.caption', { item: menu }),
                  ]}
                  style={semanticStyle('groupitem.caption', { item: menu })}
                >
                  {caption}
                </span>,
                counterId ? (
                  <iBizBadge
                    class={[
                      ns.e('counter'),
                      semanticClass('subitem.counter', { item: menu }),
                    ]}
                    style={semanticStyle('subitem.counter', { item: menu })}
                    value={c.state.counterData[counterId]}
                  />
                ) : null,
              ];
            },
            default: () => appMenuItems.map(item => renderMenu(false, item)),
          }}
        </el-menu-item-group>
      );
    };

    /**
     * @description 绘制子菜单
     * @param {boolean} isFirst
     * @param {IAppMenuItem} menu
     */
    const renderSubmenu = (isFirst: boolean, menu: IAppMenuItem) => {
      if (c.model.appMenuStyle === 'EXTVIEW1' && !isFirst)
        return renderGroupmenu(menu);
      const {
        id = '',
        sysCss,
        tooltip,
        caption,
        sysImage,
        counterId,
        appMenuItems = [],
      } = menu;
      return (
        <el-sub-menu
          index={id}
          teleported={true}
          popper-class={[
            ns.b('popup-container'),
            ns.be('popup-container', c.model.appMenuStyle?.toLowerCase()),
            ns.b(`${c.model.codeName!.toLowerCase()}--popper`),
            `${
              c.model.sysCss?.cssName
                ? `${c.model.sysCss?.cssName}--popper`
                : ''
            }`,
            `${sysCss?.cssName ? `${sysCss?.cssName}--popper` : ''}`,
            semanticClass('popup', { item: menu }),
          ]}
          title={showTitle(tooltip)}
          style={semanticStyle('submenu', { item: menu })}
          class={[
            ns.b('submenu'),
            semanticClass('submenu', { item: menu }),
            `${sysCss?.cssName || ''}`,
          ]}
        >
          {{
            default: () => appMenuItems.map(item => renderMenu(false, item)),
            title: () => {
              const provider = c.itemProviders[id];
              if (provider && provider.renderText)
                return provider.renderText(menu, c);
              if (props.collapse) {
                if (sysImage)
                  return (
                    <iBizIcon
                      class={[
                        ns.e('icon'),
                        semanticClass('subitem.icon', { item: menu }),
                      ]}
                      style={semanticStyle('subitem.icon', { item: menu })}
                      icon={sysImage}
                    ></iBizIcon>
                  );
                return [
                  isFirst ? caption?.slice(0, 1) : caption,
                  isFirst ? null : <ion-icon name='chevron-forward-outline' />,
                ];
              }
              return [
                sysImage && (
                  <iBizIcon
                    class={[
                      ns.e('icon'),
                      semanticClass('subitem.icon', { item: menu }),
                    ]}
                    style={semanticStyle('subitem.icon', { item: menu })}
                    icon={sysImage}
                  ></iBizIcon>
                ),
                <span
                  class={[
                    ns.e('caption'),
                    semanticClass('subitem.caption', { item: menu }),
                  ]}
                  style={semanticStyle('subitem.caption', { item: menu })}
                >
                  {caption}
                </span>,
                counterId ? (
                  <iBizBadge
                    class={[
                      ns.e('counter'),
                      semanticClass('subitem.counter', { item: menu }),
                    ]}
                    style={semanticStyle('subitem.counter', { item: menu })}
                    value={c.state.counterData[counterId]}
                  />
                ) : null,
              ];
            },
          }}
        </el-sub-menu>
      );
    };

    /**
     * @description 绘制菜单项
     * @param {boolean} isFirst
     * @param {IAppMenuItem} menu
     */
    const renderMenuItem = (isFirst: boolean, menu: IAppMenuItem) => {
      const {
        id = '',
        sysCss,
        caption,
        tooltip,
        sysImage,
        counterId,
        appFuncId,
      } = menu;
      let content = null;
      const provider = c.itemProviders[id];
      if (provider && provider.renderText) {
        content = provider.renderText(menu, c);
      } else if (!(isFirst && props.collapse)) {
        content = [
          sysImage ? (
            <iBizIcon
              class={[ns.e('icon'), semanticClass('item.icon', { item: menu })]}
              style={semanticStyle('item.icon', { item: menu })}
              icon={sysImage}
            ></iBizIcon>
          ) : null,
          <span
            class={[
              ns.e('caption'),
              semanticClass('item.caption', { item: menu }),
            ]}
            style={semanticStyle('item.caption', { item: menu })}
          >
            {caption}
          </span>,
          counterId ? (
            <iBizBadge
              class={[
                ns.e('counter'),
                semanticClass('item.counter', { item: menu }),
              ]}
              style={semanticStyle('item.counter', { item: menu })}
              value={c.state.counterData[counterId]}
            />
          ) : null,
        ];
      } else {
        content = [
          sysImage ? (
            <iBizIcon
              class={[ns.e('icon'), semanticClass('item.icon', { item: menu })]}
              style={semanticStyle('item.icon', { item: menu })}
              icon={sysImage}
            ></iBizIcon>
          ) : (
            caption?.slice(0, 1)
          ),
        ];
      }

      return !(isFirst && props.collapse) ? (
        <el-menu-item
          index={id}
          disabled={!appFuncId}
          title={showTitle(tooltip)}
          class={[
            ns.e('item'),
            semanticClass('item', { item: menu }),
            `${sysCss?.cssName || ''}`,
          ]}
          style={semanticStyle('item', { item: menu })}
        >
          {content}
        </el-menu-item>
      ) : (
        <el-tooltip
          theme='light'
          placement={'left'}
          content={tooltip}
          class={ns.b('tooltip')}
        >
          <el-menu-item
            index={id}
            disabled={!appFuncId}
            class={[
              ns.e('item'),
              semanticClass('item', { item: menu }),
              `${sysCss?.cssName || ''}`,
            ]}
            style={semanticStyle('item', { item: menu })}
          >
            {content}
          </el-menu-item>
        </el-tooltip>
      );
    };

    /**
     * @description 绘制分隔项
     * @param {boolean} isFirst
     * @param {IAppMenuItem} menu
     */
    const renderSeperator = (isFirst: boolean, menu: IAppMenuItem) => {
      const direction =
        c.view.model.mainMenuAlign === 'TOP' && isFirst
          ? 'vertical'
          : 'horizontal';
      return (
        <el-divider
          id={menu.id}
          direction={direction}
          class={[
            ns.em('separator', direction),
            semanticClass('divider', { item: menu }),
          ]}
          style={semanticStyle('divider', { item: menu })}
        />
      );
    };

    /**
     * @description 绘制直接内容
     * @param {IAppMenuItem} menu
     */
    const renderRawitem = (menu: IAppMenuRawItem) => {
      const { id, sysCss, tooltip } = menu;
      return (
        <el-menu-item
          index={id}
          title={showTitle(tooltip)}
          class={[
            ns.e('rawitem'),
            semanticClass('rawitem', { item: menu }),
            `${sysCss?.cssName || ''}`,
          ]}
          style={semanticStyle('rawitem', { item: menu })}
        >
          <iBizRawItem rawItem={menu}></iBizRawItem>
        </el-menu-item>
      );
    };

    /**
     * @description 绘制菜单
     * @param {boolean} isFirst 是否为首层菜单
     * @param {IAppMenuItem} menu
     */
    const renderMenu = (isFirst: boolean, menu: IAppMenuItem) => {
      const { id, itemType, appMenuItems } = menu;
      if (
        !id ||
        !c.state.menuItemsState[id].visible ||
        !getMenuCustomVisible(id, saveConfigs.value, hideSeparator.value)
      )
        return;
      if (appMenuItems?.length) return renderSubmenu(isFirst, menu);
      if (itemType === 'MENUITEM') return renderMenuItem(isFirst, menu);
      if (itemType === 'SEPERATOR') return renderSeperator(isFirst, menu);
      if (itemType === 'RAWITEM') return renderRawitem(menu);
    };

    return {
      c,
      ns,
      key,
      menuRef,
      menuMode,
      hasScroll,
      saveConfigs,
      defaultOpens,
      defaultActive,
      isShowCollapse,
      onClick,
      renderMenu,
      ellipsisSvg,
      configSaves,
      configReset,
      semanticClass,
      semanticStyle,
    };
  },
  render() {
    return (
      <iBizControlBase
        ref='menuRef'
        class={[
          this.ns.b(),
          this.semanticClass('root'),
          this.ns.m(this.menuMode),
          this.ns.b(`${this.c.model.codeName!.toLowerCase()}`),
          this.ns.b(this.c.model.appMenuStyle?.toLowerCase()),
          this.ns.is('collapse', this.collapse),
          this.ns.is('show-collapse', this.isShowCollapse),
          this.ns.is('show-menu-design', this.c.model.enableCustomized),
          this.ns.is('scroll', this.hasScroll),
          `${this.c.model.sysCss?.cssName || ''}`,
        ]}
        style={this.semanticStyle('root')}
        controller={this.c}
      >
        {this.c.state.isCreated && (
          <el-menu
            key={this.key}
            class={[this.ns.e('content'), this.semanticClass('content')]}
            style={this.semanticStyle('content')}
            popper-class={[
              this.ns.b('popper'),
              this.ns.b(`${this.c.model.codeName!.toLowerCase()}--popper`),
              `${
                this.c.model.sysCss?.cssName
                  ? `${this.c.model.sysCss.cssName}--popper`
                  : ''
              }`,
              this.semanticClass('popup'),
            ]}
            default-active={this.defaultActive}
            default-openeds={this.defaultOpens}
            collapse={this.collapse}
            collapse-transition={false}
            onSelect={this.onClick}
            theme='light'
            mode={this.menuMode}
            ellipsis-icon={() => this.ellipsisSvg()}
            ellipsis={this.menuMode === 'horizontal'}
            {...this.$attrs}
            {...renderAttrs(this.c.model, {
              ...this.c.getEventArgs(),
            })}
          >
            {{
              default: () => {
                return this.c.model.appMenuItems?.map(menu =>
                  this.renderMenu(true, menu),
                );
              },
            }}
          </el-menu>
        )}
        {this.c.model.enableCustomized && (
          <MenuDesign
            class={[
              this.ns.b('menu-set'),
              this.ns.is('collapse', this.collapse),
              this.ns.is(
                'horizontal',
                this.c.view.model.mainMenuAlign === 'TOP',
              ),
              this.semanticClass('design'),
            ]}
            style={this.semanticStyle('design')}
            controller={this.c}
            onSaved={this.configSaves}
            onReset={this.configReset}
          />
        )}
        {this.isShowCollapse && (
          <div
            class={[
              this.ns.b('collapse-icon'),
              this.semanticClass('collapse'),
              this.ns.is('collapse', this.collapse),
            ]}
            style={this.semanticStyle('collapse')}
            onClick={() => {
              this.c.view.call(ViewCallTag.TOGGLE_COLLAPSE);
            }}
          >
            <ion-icon name='menu-collapse' />
          </div>
        )}
      </iBizControlBase>
    );
  },
});
