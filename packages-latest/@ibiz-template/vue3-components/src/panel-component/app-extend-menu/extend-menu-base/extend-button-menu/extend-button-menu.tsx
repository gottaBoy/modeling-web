/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import { IAppMenuItem, IFlexLayoutPos, ILayout } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IAppMenuItemProvider } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import {
  getMenuLayout,
  findMenuItem,
  getMenus,
  IButtonMenuItem,
  IExtendMenuProps,
  IMenuContentParams,
  IMenuItemParams,
  useBorderLayout,
  useCascaderPopover,
  IMenuSemantic,
} from '../extend-menu-base.util';
import './extend-button-menu.scss';

const rightArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 1024 1024'
    width='1em'
    height='1em'
    fill='currentColor'
  >
    <path
      fill='currentColor'
      d='M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'
    ></path>
  </svg>
);

function renderMenuItem(params: IMenuItemParams): VNode | undefined {
  const { ns, menu, menuAlign, menuItemsState, semantic } = params;

  if (!menu.id || !menuItemsState[menu.id]?.visible) return;

  if (menu.itemType === 'MENUITEM') {
    return (
      <el-button
        class={[
          ns.e('menuitem'),
          `${menu.sysCss?.cssName || ''}`,
          semantic.semanticClass('item', { item: menu }),
        ]}
        style={semantic.semanticStyle('item', { item: menu })}
        index={menu.id}
      >
        {menu.sysImage && (
          <iBizIcon
            class={[
              ns.e('icon'),
              semantic.semanticClass('item.icon', { item: menu }),
            ]}
            style={semantic.semanticStyle('item.icon', { item: menu })}
            icon={menu.sysImage}
          ></iBizIcon>
        )}
        {menu.caption && (
          <span
            class={[
              ns.e('caption'),
              semantic.semanticClass('item.caption', { item: menu }),
            ]}
            style={semantic.semanticStyle('item.caption', { item: menu })}
            title={showTitle(menu.tooltip)}
          >
            {menu.caption}
          </span>
        )}
      </el-button>
    );
  }

  if (menu.itemType === 'SEPERATOR') {
    const direction = menuAlign === 'horizontal' ? 'vertical' : 'horizontal';
    return (
      <el-divider
        direction={direction}
        class={[
          ns.em('separator'),
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
      <el-button
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
      </el-button>
    );
  }
}

function renderMenuContent(_params: IMenuContentParams) {
  const {
    ns,
    isLayout,
    menuLayout,
    position,
    menuAlign,
    menus,
    menuItemsState,
    showCascaderArrow,
    semantic,
    handleMenuItemClick,
    handleMenuItemMouseEnter,
    handleMenuItemMouseLeave,
  } = _params;
  const layoutStyle = isLayout ? getMenuLayout(menuLayout) : {};
  return (
    <el-row
      class={[
        ns.e('content'),
        ns.is(menuAlign, !!menuAlign),
        ns.is(position?.toLowerCase(), !!position),
        semantic.semanticClass('content'),
      ]}
      style={[layoutStyle, semantic.semanticStyle('content')]}
    >
      {{
        default: () =>
          menus.map(menu => {
            const menuItem = renderMenuItem({
              menu,
              ns,
              menuAlign,
              menuItemsState,
              semantic,
            });
            if (!menuItem) return;

            const style = {};
            if (isLayout && menu.layoutPos?.layout === 'FLEX') {
              const pos = menu.layoutPos as IFlexLayoutPos;
              Object.assign(style, {
                flexGrow: pos.grow,
                flexShrink: pos.shrink === 1 ? undefined : pos.shrink,
                flexBasis: pos.basis,
              });
            }

            const isShowArrow = !!(showCascaderArrow && menu.children);
            return (
              <div
                class={[
                  ns.em('content', 'item'),
                  ns.em('content', menu.itemType?.toLowerCase()),
                  ns.is('show-arrow', isShowArrow),
                ]}
                style={style}
              >
                <div
                  class={ns.em('content', 'item-container')}
                  onMouseenter={(_e: MouseEvent) =>
                    handleMenuItemMouseEnter(menu, _e)
                  }
                  onMouseleave={(_e: MouseEvent) =>
                    handleMenuItemMouseLeave(menu, _e)
                  }
                  onClick={(_e: MouseEvent) => handleMenuItemClick(menu, _e)}
                >
                  {menuItem}
                </div>
                {isShowArrow && (
                  <span class={ns.em('content', 'item-arrow')}>
                    {rightArrow()}
                  </span>
                )}
              </div>
            );
          }),
      }}
    </el-row>
  );
}

export const ExtendButtonMenu = defineComponent({
  name: 'IBizExtendButtonMenu',
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
    menuItemClick: (item: IAppMenuItem, event: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('extend-menu-button');
    const buttonMenuRef = ref<HTMLElement | undefined>();
    const menuAlign = computed(() =>
      ['TOP', 'BOTTOM'].includes(props.position) ? 'horizontal' : 'vertical',
    );
    const isLayout = computed(() => props.layoutMode !== 'BORDER');
    const menus = ref<IButtonMenuItem[]>(getMenus(props.items));

    const renderCascaderContent = (_menu: IButtonMenuItem) => {
      return renderMenuContent({
        ns,
        menuAlign: 'vertical',
        position: props.position,
        menus: _menu.children!,
        menuItemsState: props.menuItemsState,
        handleMenuItemClick,
        handleMenuItemMouseEnter,
        handleMenuItemMouseLeave,
        showCascaderArrow: true,
        isLayout: false,
        semantic: props.semantic,
      });
    };
    const renderBorderContent = () => {
      return renderMenuContent({
        ns,
        menuAlign: menuAlign.value,
        position: props.position,
        menus: menus.value,
        menuItemsState: props.menuItemsState,
        handleMenuItemClick,
        handleMenuItemMouseEnter,
        handleMenuItemMouseLeave,
        showCascaderArrow: true,
        isLayout: false,
        semantic: props.semantic,
      });
    };

    const {
      getOverlayNum,
      clearAllCascader,
      handleMenuItemMouseEnter,
      handleMenuItemMouseLeave,
    } = useCascaderPopover(
      props as IExtendMenuProps,
      ns,
      menuAlign,
      renderCascaderContent,
    );
    let closeBorderPopover: () => void | undefined;
    if (props.layoutMode === 'BORDER') {
      const borderLayout = useBorderLayout(
        buttonMenuRef,
        ns,
        props.position,
        menuAlign,
        getOverlayNum,
        renderBorderContent,
      );
      closeBorderPopover = borderLayout.closeBorderPopover;
    }

    const handleMenuItemClick = async (
      _menu: IButtonMenuItem,
      _event: MouseEvent,
    ): Promise<void> => {
      if (_menu.children) return;
      clearAllCascader();
      if (closeBorderPopover) closeBorderPopover();
      if (!_menu.appFuncId) {
        ibiz.log.warn(
          ibiz.i18n.t('runtime.controller.control.menu.noConfigured'),
        );
        return;
      }

      const menuItem = findMenuItem(_menu.id as string, props.items);
      emit('menuItemClick', menuItem!, _event);
    };

    return {
      ns,
      menus,
      menuAlign,
      isLayout,
      buttonMenuRef,
      handleMenuItemClick,
      handleMenuItemMouseEnter,
      handleMenuItemMouseLeave,
    };
  },
  render() {
    return (
      <div
        ref='buttonMenuRef'
        class={[
          this.ns.b(),
          this.ns.is(this.layoutMode.toLowerCase(), !!this.layoutMode),
          this.ns.is(this.position.toLowerCase(), !!this.position),
          this.ns.is(this.menuAlign, !!this.menuAlign),
        ]}
      >
        {this.layoutMode !== 'BORDER' &&
          renderMenuContent({
            ns: this.ns,
            menuAlign: this.menuAlign,
            isLayout: this.isLayout,
            menuLayout: this.layout,
            position: this.position,
            menus: this.menus,
            menuItemsState: this.menuItemsState,
            handleMenuItemClick: this.handleMenuItemClick,
            handleMenuItemMouseEnter: this.handleMenuItemMouseEnter,
            handleMenuItemMouseLeave: this.handleMenuItemMouseLeave,
            semantic: this.semantic,
          })}
      </div>
    );
  },
});
