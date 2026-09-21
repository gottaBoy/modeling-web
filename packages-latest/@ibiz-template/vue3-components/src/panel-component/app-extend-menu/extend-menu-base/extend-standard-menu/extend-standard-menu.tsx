import { ref, VNode, PropType, defineComponent, computed } from 'vue';
import { IAppMenuItem, ILayout } from '@ibiz/model-core';
import { showTitle } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IAppMenuItemProvider } from '@ibiz-template/runtime';
import { createUUID } from 'qx-util';
import {
  findMenuItem,
  getMenus,
  IStandardMenuContentParams,
  IStandardMenuItemParams,
  IMenuBaseItem,
  IMenuSemantic,
} from '../extend-menu-base.util';
import './extend-standard-menu.scss';

const ellipsisSvg = (): VNode => {
  return <ion-icon name='ellipsis-horizontal'></ion-icon>;
};

/**
 * 绘制菜单项
 * @param {IStandardMenuItemParams} _params
 * @returns {*}
 */
function renderMenuItem(_params: IStandardMenuItemParams): VNode | undefined {
  const { isFirst, menu, collapse, ns, menuAlign, menuItemsState, semantic } =
    _params;
  // TODO 是否显示状态值待定
  if (!menu.id || (menuItemsState && !menuItemsState[menu.id]?.visible)) {
    return;
  }

  if (menu.itemType === 'MENUITEM') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let content: any;
    if (!(isFirst && collapse)) {
      content = [
        menu.sysImage ? (
          <iBizIcon
            class={[
              ns.e('icon'),
              semantic.semanticClass('item.icon', { item: menu }),
            ]}
            style={semantic.semanticStyle('item.icon', { item: menu })}
            icon={menu.sysImage}
          ></iBizIcon>
        ) : null,
        <span
          class={[
            ns.e('caption'),
            semantic.semanticClass('item.caption', { item: menu }),
          ]}
          style={semantic.semanticStyle('item.caption', { item: menu })}
        >
          {menu.caption}
        </span>,
      ];
    } else {
      content = [
        menu.sysImage ? (
          <iBizIcon
            class={[
              ns.e('icon'),
              semantic.semanticClass('item.icon', { item: menu }),
            ]}
            style={semantic.semanticStyle('item.icon', { item: menu })}
            icon={menu.sysImage}
          ></iBizIcon>
        ) : (
          <span
            class={[
              ns.e('caption'),
              semantic.semanticClass('item.caption', { item: menu }),
            ]}
            style={semantic.semanticStyle('item.caption', { item: menu })}
          >
            {menu.caption?.slice(0, 1)}
          </span>
        ),
      ];
    }

    return !(isFirst && collapse) ? (
      <el-menu-item
        class={[
          ns.e('item'),
          `${menu.sysCss?.cssName || ''}`,
          semantic.semanticClass('item', { item: menu }),
        ]}
        style={semantic.semanticStyle('item', { item: menu })}
        index={menu.id}
        title={showTitle(menu.tooltip)}
      >
        {content}
      </el-menu-item>
    ) : (
      <el-tooltip
        class={ns.b('tooltip')}
        content={menu.caption}
        placement={menuAlign === 'horizontal' ? 'bottom' : 'left'}
        theme='light'
      >
        <el-menu-item
          class={[
            ns.e('item'),
            `${menu.sysCss?.cssName || ''}`,
            semantic.semanticClass('item', { item: menu }),
          ]}
          style={semantic.semanticStyle('item', { item: menu })}
          index={menu.id}
        >
          {content}
        </el-menu-item>
      </el-tooltip>
    );
  }
  if (menu.itemType === 'SEPERATOR') {
    const direction =
      menuAlign === 'horizontal' && isFirst ? 'vertical' : 'horizontal';
    return (
      <el-divider
        direction={direction}
        class={[
          ns.em('separator', direction),
          semantic.semanticClass('divider', { item: menu }),
        ]}
        style={semantic.semanticStyle('divider', { item: menu })}
        id={menu.id}
      />
    );
  }
  if (menu.itemType === 'RAWITEM') {
    return (
      <el-menu-item
        index={menu.id}
        title={showTitle(menu.tooltip)}
        class={[
          ns.e('rawitem'),
          `${menu.sysCss?.cssName || ''}`,
          semantic.semanticClass('rawitem', { item: menu }),
        ]}
        style={semantic.semanticStyle('rawitem', { item: menu })}
      >
        <iBizRawItem rawItem={menu}></iBizRawItem>
      </el-menu-item>
    );
  }
}

/**
 * 绘制子菜单
 * @param {IStandardMenuItemParams} _params
 * @returns {*}
 */
function renderSubmenu(_params: IStandardMenuItemParams): VNode | undefined {
  const { isFirst, menu, collapse, ns, menuAlign, menuItemsState, semantic } =
    _params;
  if (!menu.id || (menuItemsState && !menuItemsState[menu.id]?.visible)) {
    return;
  }
  return (
    <el-sub-menu
      class={[
        ns.b('submenu'),
        `${menu.sysCss?.cssName || ''}`,
        semantic.semanticClass('submenu', { item: menu }),
      ]}
      style={semantic.semanticStyle('submenu', { item: menu })}
      index={menu.id}
      teleported={true}
      popper-class={[
        ns.b('popup-container'),
        semantic.semanticClass('popup', { item: menu }),
      ]}
    >
      {{
        default: () =>
          menu.children &&
          menu.children.map((item: IMenuBaseItem) => {
            if (item.children && item.children) {
              return renderSubmenu({
                isFirst: false,
                menu: item,
                collapse,
                ns,
                menuAlign,
                menuItemsState,
                semantic,
              });
            }
            return renderMenuItem({
              isFirst: false,
              menu: item,
              collapse,
              ns,
              menuAlign,
              menuItemsState,
              semantic,
            });
          }),
        title: () => {
          if (collapse) {
            if (menu.sysImage) {
              return (
                <iBizIcon
                  class={[
                    ns.e('icon'),
                    semantic.semanticClass('subitem.icon', { item: menu }),
                  ]}
                  style={semantic.semanticStyle('subitem.icon', { item: menu })}
                  icon={menu.sysImage}
                ></iBizIcon>
              );
            }
            return [
              isFirst ? menu.caption?.slice(0, 1) : menu.caption,
              isFirst ? null : <ion-icon name='chevron-forward-outline' />,
            ];
          }
          return [
            <iBizIcon
              class={[
                ns.e('icon'),
                semantic.semanticClass('subitem.icon', { item: menu }),
              ]}
              style={semantic.semanticStyle('subitem.icon', { item: menu })}
              icon={menu.sysImage}
            ></iBizIcon>,
            <span
              class={[
                ns.e('caption'),
                semantic.semanticClass('subitem.caption', { item: menu }),
              ]}
              style={semantic.semanticStyle('subitem.caption', { item: menu })}
            >
              {menu.caption}
            </span>,
          ];
        },
      }}
    </el-sub-menu>
  );
}

/**
 * 绘制菜单内容
 *
 * @param {IStandardMenuContentParams} _params
 * @return {*}
 */
function renderMenuContent(_params: IStandardMenuContentParams): VNode {
  const {
    refreshKey,
    ns,
    collapse,
    menuAlign,
    position,
    menus,
    menuItemsState,
    semantic,
    handleMenuSelect,
  } = _params;

  return (
    <div
      class={[
        ns.e('content'),
        ns.is('collapse', collapse),
        ns.is(menuAlign, !!menuAlign),
        ns.is(position?.toLowerCase(), !!position),
        semantic.semanticClass('content'),
      ]}
      style={semantic.semanticStyle('content')}
    >
      <el-menu
        key={refreshKey}
        popper-class={[ns.b('popper')]}
        collapse={collapse}
        collapse-transition={false}
        onSelect={handleMenuSelect}
        theme='light'
        mode={menuAlign}
        ellipsis-icon={() => ellipsisSvg()}
        ellipsis={menuAlign === 'horizontal'}
      >
        {{
          default: () => {
            return menus.map(item => {
              if (item.children && item.children.length > 0) {
                return renderSubmenu({
                  isFirst: true,
                  menu: item,
                  collapse,
                  ns,
                  menuAlign,
                  menuItemsState,
                  semantic,
                });
              }
              return renderMenuItem({
                isFirst: true,
                menu: item,
                collapse,
                ns,
                menuAlign,
                menuItemsState,
                semantic,
              });
            });
          },
        }}
      </el-menu>
    </div>
  );
}

export const ExtendStandardMenu = defineComponent({
  name: 'IBizExtendStandardMenu',
  props: {
    items: { type: Object as PropType<IAppMenuItem[]>, required: true },
    menuItemsState: {
      type: Object as PropType<{
        [p: string]: { visible: boolean; permitted: boolean };
      }>,
      required: true,
    },
    providers: {
      type: Object as PropType<{ [key: string]: IAppMenuItemProvider }>,
      required: true,
    },
    position: {
      type: String as PropType<'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'>,
      required: true,
    },
    layoutMode: {
      type: String as PropType<
        'TABLE' | 'TABLE_12COL' | 'TABLE_24COL' | 'FLEX' | 'BORDER' | 'ABSOLUTE'
      >,
      required: true,
    },
    layout: { type: Object as PropType<ILayout> },
    semantic: {
      type: Object as PropType<IMenuSemantic>,
      default: () => ({
        semanticClass: () => '',
        semanticStyle: () => '',
      }),
    },
  },
  emits: {
    /**
     * @description 项点击事件
     */
    menuItemClick: (_item: IAppMenuItem, _event: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('extend-standard-menu');
    const defaultMenuRef = ref();
    const refreshKey = ref(createUUID());
    const collapse = ref(false);
    const menuAlign = computed(() =>
      ['TOP', 'BOTTOM'].includes(props.position) ? 'horizontal' : 'vertical',
    );
    const menus = ref<IMenuBaseItem[]>(getMenus(props.items));
    const handleMenuSelect = async (
      _id: string,
      _event: MouseEvent,
    ): Promise<void> => {
      const menuItem = findMenuItem(_id, props.items);
      if (!menuItem?.appFuncId) {
        ibiz.log.warn(
          ibiz.i18n.t('runtime.controller.control.menu.noConfigured'),
        );
        return;
      }
      emit('menuItemClick', menuItem!, _event);
    };

    return {
      ns,
      defaultMenuRef,
      refreshKey,
      collapse,
      menuAlign,
      menus,
      handleMenuSelect,
    };
  },
  render() {
    return (
      <div
        ref='defaultMenuRef'
        class={[
          this.ns.b(),
          this.ns.b(this.layoutMode.toLowerCase()),
          this.ns.is(this.position.toLowerCase(), true),
          this.ns.is(this.menuAlign, true),
          this.ns.is('collapse', this.collapse),
        ]}
      >
        {renderMenuContent({
          isLayout: false,
          position: this.position,
          refreshKey: this.refreshKey,
          ns: this.ns,
          collapse: this.collapse,
          menuAlign: this.menuAlign,
          menus: this.menus,
          menuLayout: this.layout,
          menuItemsState: this.menuItemsState,
          handleMenuSelect: this.handleMenuSelect,
          semantic: this.semantic,
        })}
      </div>
    );
  },
});
