/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import { h, ref, Ref, VNode, onMounted, onUnmounted } from 'vue';
import { IAppMenuItem, IFlexLayout, ILayout } from '@ibiz/model-core';
import { IAppMenuItemProvider } from '@ibiz-template/runtime';
import { Namespace } from '@ibiz-template/core';

/**
 * @description 组件传参类型定义
 *
 * @export
 * @interface IExtendMenuProps
 */
export interface IExtendMenuProps {
  // 所有菜单项数据
  items: IAppMenuItem[];
  // 权限状态
  menuItemsState: {
    [p: string]: { visible: boolean; permitted: boolean };
  };
  // 菜单项适配器集合
  providers: { [key: string]: IAppMenuItemProvider };
  // 菜单弹出方向
  position: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM';
  layoutMode:
    | 'TABLE'
    | 'TABLE_12COL'
    | 'TABLE_24COL'
    | 'FLEX'
    | 'BORDER'
    | 'ABSOLUTE'; // 布局模式
  layout: ILayout; // 布局模型
}

/**
 * @description 菜单项绘制数据
 *
 * @export
 * @interface IMenuBaseItem
 * @extends {IAppMenuItem}
 */
export interface IMenuBaseItem extends IAppMenuItem {
  /** 数据层级 */
  level: number;
  /** 主键 */
  value?: string;
  /** 主文本 */
  label?: string;
  /** 父主键 */
  parentId?: string;
  /** 子项数据集合 */
  children?: IMenuBaseItem[];
}

// 菜单语义化参数
export interface IMenuSemantic {
  semanticClass: Function;
  semanticStyle: Function;
}

/**
 * @description 按钮菜单项绘制数据
 *
 * @export
 * @interface IButtonMenuItem
 * @extends {IAppMenuItem}
 */
export interface IButtonMenuItem extends IMenuBaseItem {}

/**
 * @description 菜单绘制通用参数
 *
 * @export
 * @interface IMenuRenderParams
 */
export interface IMenuRenderParams {
  /** 菜单样式处理命名空间 */
  ns: Namespace;
  /** 菜单对齐 */
  menuAlign: 'horizontal' | 'vertical';
  /** 菜单项权限数据 */
  menuItemsState: { [p: string]: { visible: boolean; permitted: boolean } };
  // 语义化节点数据
  semantic: IMenuSemantic;
}

/**
 * @description 绘制单个菜单项参数
 *
 * @export
 * @interface IMenuItemParams
 * @extends {IMenuRenderParams}
 */
export interface IMenuItemParams extends IMenuRenderParams {
  /** 菜单项 */
  menu: IMenuBaseItem;
}

/**
 * @description 多菜单项（子菜单内容）参数
 *
 * @export
 * @interface IMenuContentParams
 * @extends {IMenuRenderParams}
 */
export interface IMenuContentParams extends IMenuRenderParams {
  /** 是否支持布局 */
  isLayout: boolean;
  /** 菜单方向 */
  position: string;
  /** 菜单项绘制数据集合 */
  menus: IButtonMenuItem[];
  /** 显示级联箭头 */
  showCascaderArrow?: boolean;
  /** 菜单布局模型 */
  menuLayout?: ILayout;
  /** 菜单项点击 */
  handleMenuItemClick: (_menu: IButtonMenuItem, event: MouseEvent) => void;
  /** 鼠标移入菜单项，准备弹出子菜单 */
  handleMenuItemMouseEnter: (_menu: IButtonMenuItem, event: MouseEvent) => void;
  /** 鼠标移出菜单项 */
  handleMenuItemMouseLeave: (_menu: IButtonMenuItem, event: MouseEvent) => void;
}

/**
 * @description 绘制常规菜单项参数
 *
 * @export
 * @interface IStandardMenuItemParams
 * @extends {IMenuRenderParams}
 */
export interface IStandardMenuItemParams extends IMenuRenderParams {
  /** 菜单项 */
  menu: IMenuBaseItem;
  /** 是否为首次绘制 */
  isFirst: boolean;
  /** 是否水平折叠收起菜单 */
  collapse: boolean;
}

/**
 * @description 绘制常规菜单的参数
 *
 * @export
 * @interface IStandardMenuContentParams
 * @extends {IMenuContentParams}
 */
export interface IStandardMenuContentParams extends IMenuRenderParams {
  /** 是否支持布局 */
  isLayout: boolean;
  /** 菜单方向 */
  position: string;
  /** 是否水平折叠收起菜单（仅在 menuAlign 为 vertical 时可用） */
  collapse: boolean;
  /** 刷新key */
  refreshKey: string;
  /** 菜单项绘制数据集合 */
  menus: IMenuBaseItem[];
  /** 菜单布局模型 */
  menuLayout?: ILayout;
  /** 菜单选中 */
  handleMenuSelect: (_id: string, event: MouseEvent) => void;
}

/**
 * @description 用于构建级联菜单的弹出层控制逻辑
 *
 * - 支持多层级菜单结构；
 * - 根据鼠标移入/移出控制子菜单弹出与关闭；
 * - 菜单项移入时打开对应子菜单，移出时自动延迟关闭；
 * - 子菜单弹出方向根据配置自动计算；
 * - 支持箭头图标旋转动画；
 *
 * @param props - 外部传入的菜单属性，包含菜单项、权限、适配器、布局模式等
 * @param ns - 命名空间，用于生成 CSS BEM 类名
 * @param menuAlign - 菜单排列方向（如 vertical）
 * @param onMenuItemClick - 菜单项点击事件处理器
 * @param renderCascader - 子菜单内容渲染函数（返回 VNode）
 *
 * @returns {
 *   getOverlayNum: 获取打开的级联数量；
 *   clearAllCascader: 清除所有层级弹窗和计时器；
 *   openCascaderPopover: 打开子菜单气泡；
 *   onMenuItemMouseEnter: 鼠标移入菜单项时的处理函数；
 *   onMenuItemMouseLeave: 鼠标移出菜单项时的处理函数；
 * }
 */
export function useCascaderPopover(
  props: IExtendMenuProps,
  ns: Namespace,
  menuAlign: Ref<string>,
  renderCascaderContent: (_menu: IButtonMenuItem) => VNode,
): {
  getOverlayNum: () => number;
  clearAllCascader: () => void;
  openCascaderPopover: (
    menu: IButtonMenuItem,
    evt: MouseEvent,
    opts?: IData,
  ) => void;
  handleMenuItemMouseEnter: (
    _menu: IButtonMenuItem,
    _event: MouseEvent,
  ) => void;
  handleMenuItemMouseLeave: (
    _menu: IButtonMenuItem,
    _event: MouseEvent,
  ) => void;
} {
  // 当前鼠标位于弹窗区域内的计数器，用于控制是否关闭弹窗
  let hoverCount = 0;
  // 弹出层延时关闭的计时器引用
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  // 存储每一级菜单对应的弹出层实例（Map<level, overlay>）
  const overlayInstances = new Map();
  // 存储当前激活的菜单项 ID 栈（用于判断哪些项是“当前激活”的）
  const activeMenuIdStack = ref<string[]>([]);
  // 存储当前被旋转箭头元素（Map<level, HTMLElement>）
  const rotatedArrowElements = new Map();

  /** 获取打开的级联气泡数量 */
  const getOverlayNum = () => {
    return overlayInstances.size;
  };

  /** 获取当前层级对应弹出方向 */
  const getPopoverPlacement = (level: number) => {
    switch (props.position) {
      case 'TOP':
        return level > 0 ? 'right-start' : 'bottom-start';
      case 'BOTTOM':
        return level > 0 ? 'right-end' : 'top-start';
      case 'RIGHT':
        return 'left-start';
      case 'LEFT':
        return 'right-start';
      default:
        return undefined;
    }
  };

  /** 清除定时器 */
  const clearCloseTimer = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  /** 清除箭头旋转状态 */
  const resetArrowRotation = (ns: Namespace, key: number | string) => {
    const arrow = rotatedArrowElements.get(key);
    if (!arrow) return;
    arrow.classList.remove(ns.is('rotate-arrow', true));
    rotatedArrowElements.delete(key);
  };

  /** 旋转箭头图标 */
  const rotateArrowIcon = (
    el: HTMLElement,
    ns: Namespace,
    key: number | string,
  ) => {
    if (el) {
      el.classList.add(ns.is('rotate-arrow', true));
      rotatedArrowElements.set(key, el);
    }
  };

  /** 关闭指定层级的级联气泡 */
  const closePopoverAtLevel = (key: string | number) => {
    const overlay = overlayInstances.get(key);
    if (overlay) {
      overlay.dismiss();
      overlayInstances.delete(key);
      resetArrowRotation(ns, key);
    }
  };

  /** 关闭当前菜单项所在层级及其所有后续层级的弹出层。 */
  const closeSubsequentPopovers = (currentLevel: number) => {
    let level = currentLevel;

    // 向下查找，找到当前层级后面最后存在的弹层
    while (overlayInstances.get(level + 1)) {
      level++;
    }

    // 从找到的最深层级往回关闭，直到当前层级
    for (let i = level; i >= currentLevel; i--) {
      closePopoverAtLevel(i);
    }
  };

  /** 关闭所有级联气泡 */
  const closeAllPopovers = () => {
    for (const key of overlayInstances.keys()) {
      closePopoverAtLevel(key);
    }
    overlayInstances.clear();
    activeMenuIdStack.value = [];
    hoverCount = 0;
  };

  /** 计划延时关闭（鼠标移出时触发） */
  const scheduleDelayedClose = () => {
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      if (hoverCount <= 0) {
        closeAllPopovers();
      }
    }, 300);
  };

  const clearAllCascader = () => {
    closeAllPopovers();
    clearCloseTimer();
  };

  /** 鼠标移入菜单项，准备弹出子菜单 */
  const handleMenuItemMouseEnter = (
    _menu: IButtonMenuItem,
    event: MouseEvent,
  ) => {
    if (activeMenuIdStack.value.includes(_menu.id!)) return;
    activeMenuIdStack.value.push(_menu.id!);

    // 清除当前层级及后续层级的气泡
    closeSubsequentPopovers(_menu.level);

    // 有子菜单则打开
    if (_menu.children) {
      openCascaderPopover(_menu, event);
    }

    clearCloseTimer();
  };

  /** 鼠标移出菜单项 */
  const handleMenuItemMouseLeave = (_menu: IButtonMenuItem) => {
    const index = activeMenuIdStack.value.indexOf(_menu.id!);
    if (index !== -1) {
      activeMenuIdStack.value.splice(index, 1);
    }
    scheduleDelayedClose();
  };

  /** 级联气泡上监听鼠标移入 */
  const onPopoverMouseEnter = () => {
    hoverCount++;
    clearCloseTimer();
  };

  /** 级联气泡上监听鼠标移出 */
  const onPopoverMouseLeave = (_menu: IButtonMenuItem, _event: MouseEvent) => {
    hoverCount = Math.max(0, hoverCount - 1);
    scheduleDelayedClose();
  };

  /** 打开子菜单气泡 */
  const openCascaderPopover = (
    menu: IButtonMenuItem,
    evt: MouseEvent,
    opts?: IData,
  ): void => {
    const overlay = ibiz.overlay.createPopover(
      () =>
        h(renderCascaderContent(menu), {
          onMouseenter: onPopoverMouseEnter,
          onMouseleave: onPopoverMouseLeave,
        }),
      undefined,
      {
        width: 'auto',
        height: 'auto',
        noArrow: true,
        placement: getPopoverPlacement(menu.level),
        offsetOpts: 10,
        ...opts,
        modalClass: `${ns.b('cascader-popover')} ${ns.is(
          menuAlign.value,
          true,
        )} ${opts?.modalClass || ''}`,
      },
    );

    overlayInstances.set(menu.level, overlay);
    overlay?.present(evt.currentTarget as HTMLElement);
    rotateArrowIcon(
      (evt.currentTarget as IData)?.parentElement as HTMLElement,
      ns,
      menu.level,
    );
  };

  return {
    getOverlayNum,
    openCascaderPopover,
    clearAllCascader,
    handleMenuItemMouseEnter,
    handleMenuItemMouseLeave,
  };
}

/**
 * @description 用于构建边缘布局弹出层控制逻辑
 *
 * - 创建 fixed 占位元素
 * - 占位块随目标元素变化而更新
 * - 鼠标悬停触发弹出层
 * - 移出占位层自动关闭弹层
 * - 组件卸载自动清理
 *
 * @export
 * @param {(Ref<HTMLElement | undefined>)} menuRef 菜单元素引用
 * @param {Namespace} ns 命名空间工具
 * @param {('LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM')} position 元素的方向
 * @param {Ref<string>} menuAlign 菜单对齐方式
 * @param {() => number} getOverlayNum 获取当前层级 Overlay 数量
 * @param {() => VNode} renderBorderContent 渲染边框内容
 * @returns {
 *   closeBorderPopover: 关闭边框弹出层
 * }
 */
export function useBorderLayout(
  menuRef: Ref<HTMLElement | undefined>,
  ns: Namespace,
  position: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM',
  menuAlign: Ref<string>,
  getOverlayNum: () => number,
  renderBorderContent: () => VNode,
): {
  closeBorderPopover: () => void;
} {
  let overlay: IData | null;

  /**
   * 获取元素相对于页面的位置与尺寸
   */
  const getElementAbsolutePosition = (element: HTMLElement) => {
    let x = 0;
    let y = 0;
    let current: HTMLElement | null = element;

    while (current) {
      x += current.offsetLeft;
      y += current.offsetTop;
      current = current.offsetParent as HTMLElement;
    }

    return {
      x,
      y,
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
  };

  /**
   * 根据位置返回对应的弹出方向
   */
  const resolvePopoverPlacement = () => {
    switch (position) {
      case 'TOP':
        return 'bottom';
      case 'BOTTOM':
        return 'top';
      case 'RIGHT':
        return 'left';
      case 'LEFT':
        return 'right';
      default:
        return undefined;
    }
  };

  let popoverEl: HTMLElement | undefined;

  /**
   * 关闭边框弹出层
   */
  const closeBorderPopover = () => {
    overlay?.dismiss();
    overlay = null;
    document.removeEventListener('mousemove', handleMouseTrackOut);
    popoverEl = undefined;
  };

  /**
   * 鼠标移出边框弹层时关闭逻辑
   */
  const handleMouseTrackOut = (e: MouseEvent) => {
    if (!popoverEl) {
      popoverEl = document.querySelector(
        `.${ns.b('border-popover')}`,
      ) as HTMLElement;
    }

    const pos = getElementAbsolutePosition(popoverEl);
    const isInside =
      e.pageX >= pos.x &&
      e.pageX <= pos.x + pos.width &&
      e.pageY >= pos.y &&
      e.pageY <= pos.y + pos.height;

    if (!isInside && getOverlayNum() <= 0) {
      closeBorderPopover();
    }
  };

  /**
   * 鼠标移入占位元素后显示弹出边框
   */
  const handlePlaceholderMouseEnter = async (evt: MouseEvent) => {
    if (overlay) return;

    overlay = ibiz.overlay.createPopover(
      () => h(renderBorderContent()),
      undefined,
      {
        width: 'auto',
        height: 'auto',
        noArrow: true,
        placement: resolvePopoverPlacement(),
        offsetOpts: -1,
        modalClass: `${ns.b('border-popover')} ${ns.is(menuAlign.value, true)}`,
      },
    );

    const triggerEl = (evt.currentTarget as HTMLElement)?.querySelector(
      `.${ns.be('placehold', 'line')}`,
    );
    await overlay?.present(triggerEl as HTMLElement);

    setTimeout(() => {
      document.addEventListener('mousemove', handleMouseTrackOut);
    }, 200);
  };

  let placeholderEl: HTMLElement | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let frameLoopId: number | null = null;

  const minWidth = 20;
  const minHeight = 20;

  const computeTop = (top: number, height: number) => {
    return position === 'BOTTOM' ? top + height - minHeight : top;
  };

  const computeLeft = (left: number, width: number) => {
    return position === 'RIGHT' ? left + width - minWidth : left;
  };

  const computeWidth = (width: number) => {
    return ['RIGHT', 'LEFT'].includes(position) ? minWidth : width;
  };

  const computeHeight = (height: number) => {
    return ['TOP', 'BOTTOM'].includes(position) ? minHeight : height;
  };

  /**
   * 创建固定定位的跟随占位元素
   */
  function createFixedPlaceholder(el: HTMLElement) {
    const container = document.createElement('div');
    container.classList.add(ns.b('placehold'));
    container.classList.add(ns.is(position.toLowerCase(), !!position));

    const line = document.createElement('div');
    line.classList.add(ns.be('placehold', 'line'));

    const arrow = document.createElement('div');
    arrow.classList.add(ns.be('placehold', 'arrow'));

    container.appendChild(line);
    container.appendChild(arrow);
    document.body.appendChild(container);

    placeholderEl = container;
    placeholderEl.addEventListener('mouseenter', handlePlaceholderMouseEnter);

    // 添加 SVG 箭头图标
    arrow.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 1024 1024"
           width="1em"
           height="1em"
           fill="currentColor">
        <path fill="currentColor"
              d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
        </path>
      </svg>
    `;
    updatePlaceholderPosition(el);
  }

  /**
   * 更新占位元素的位置和尺寸
   */
  function updatePlaceholderPosition(el: HTMLElement) {
    if (!placeholderEl) return;
    const rect = el.getBoundingClientRect();

    placeholderEl.style.top = `${computeTop(rect.top, rect.height)}px`;
    placeholderEl.style.left = `${computeLeft(rect.left, rect.width)}px`;
    placeholderEl.style.width = `${computeWidth(rect.width)}px`;
    placeholderEl.style.height = `${computeHeight(rect.height)}px`;
  }

  /**
   * 启动监听，创建并跟踪占位元素
   */
  function startTracking() {
    const el = menuRef.value;
    if (!el) return;

    createFixedPlaceholder(el);

    resizeObserver = new ResizeObserver(() => updatePlaceholderPosition(el));
    resizeObserver.observe(el);

    const updateLoop = () => {
      updatePlaceholderPosition(el);
      frameLoopId = requestAnimationFrame(updateLoop);
    };
    frameLoopId = requestAnimationFrame(updateLoop);
  }

  /**
   * 停止跟踪并销毁占位元素与监听器
   */
  function stopTrackingAndDestroy() {
    if (resizeObserver) {
      const el = menuRef.value;
      if (el) resizeObserver.unobserve(el);
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (frameLoopId !== null) {
      cancelAnimationFrame(frameLoopId);
      frameLoopId = null;
    }

    if (placeholderEl && placeholderEl.parentNode) {
      placeholderEl.removeEventListener(
        'mouseenter',
        handlePlaceholderMouseEnter,
      );
      placeholderEl.parentNode.removeChild(placeholderEl);
      placeholderEl = null;
    }
  }

  // 生命周期钩子注册
  onMounted(startTracking);
  onUnmounted(stopTrackingAndDestroy);

  return { closeBorderPopover };
}

/**
 * 递归生成菜单数据，递给 element 的 Menu 组件
 *
 * @param {AppMenuItemModel[]} items
 * @return {*}  {IMenuBaseItem[]}
 */
export function getMenus(
  items: IAppMenuItem[],
  _parentItem?: IAppMenuItem,
  level = 0,
): IMenuBaseItem[] {
  return items.map(item => {
    const data: IMenuBaseItem = {
      ...item,
      value: item.id,
      label: item.caption,
      parentId: _parentItem?.id,
      level,
    };
    if (item.appMenuItems?.length) {
      data.children = getMenus(item.appMenuItems, item, level + 1);
    }
    return data;
  });
}

/**
 * @description 查询菜单项模型
 *
 * @export
 * @param {string} _id 菜单标识
 * @param {IAppMenuItem[]} items 菜单数据集合
 * @return {*}  {(IAppMenuItem | undefined)}
 */
export function findMenuItem(
  _id: string,
  items: IAppMenuItem[],
): IAppMenuItem | undefined {
  let temp: IAppMenuItem | undefined;
  if (items) {
    items.some((item: IAppMenuItem): boolean => {
      if (!item.id) return true;
      if (item.id === _id) {
        temp = item;
        return true;
      }
      if (item.appMenuItems && item.appMenuItems.length > 0) {
        temp = findMenuItem(_id, item.appMenuItems);
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
 * 获取菜单布局样式
 *
 * @param {ILayout} [layout] 布局模型
 * @return {*}
 */
export function getMenuLayout(layout?: ILayout): IData {
  if (layout?.layout === 'FLEX') {
    const { align, valign } = layout as IFlexLayout;
    return {
      justifyContent: align,
      alignItems: valign,
    };
  }

  return {};
}
