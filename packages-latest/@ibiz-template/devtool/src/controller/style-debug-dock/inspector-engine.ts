import type { IInspectorOptions } from './types';

/**
 * overlay block 类名（与 useNamespace('style-debug-dock-overlay') 生成结果一致）
 */
const OVERLAY_BLOCK = 'ibiz-style-debug-dock-overlay';

/**
 * 检查器引擎
 *
 * 职责：
 *  - 开启运行时元素点选模式后，全局监听 mouseover / mousemove / click（capture 阶段）
 *  - 使用绝对定位悬浮层（Overlay Div）覆盖目标元素实现高亮，不直接修改目标元素样式
 *    （避免重排与样式污染），通过 getBoundingClientRect() 获取目标位置
 *  - 点击锁定目标节点后回调控制器
 *  - 维护持久选中态 overlay（切换激活节点时由控制器驱动）
 *
 * @author tony001
 * @date 2025-03-24
 */
export class InspectorEngine {
  /**
   * 悬停高亮 overlay（主题色虚线，跟随鼠标）
   */
  protected hoverOverlay: HTMLDivElement;

  /**
   * 选中锁定 overlay（主题色实线，持续显示当前激活节点）
   */
  protected selectedOverlay: HTMLDivElement;

  /**
   * 调试面板根容器（点选时排除面板自身元素）
   */
  protected panelRoot: HTMLElement;

  /**
   * 引擎配置（含点击锁定回调）
   */
  protected options: IInspectorOptions;

  /**
   * 是否处于点选模式
   */
  protected isInspecting = false;

  /**
   * 当前悬停目标节点
   */
  protected hoverTarget: HTMLElement | null = null;

  /**
   * 当前选中锁定节点（用于 scroll/resize 时重新定位 selectedOverlay）
   */
  protected selectedTarget: HTMLElement | null = null;

  /**
   * 选中节点尺寸观察器：样式变更导致目标重排时，实时重定位 selectedOverlay
   */
  protected selectedResizeObserver: ResizeObserver;

  constructor(panelRoot: HTMLElement, options: IInspectorOptions) {
    this.panelRoot = panelRoot;
    this.options = options;
    this.hoverOverlay = this.createOverlay('hover');
    this.selectedOverlay = this.createOverlay('selected');
    document.body.append(this.hoverOverlay, this.selectedOverlay);
    this.selectedResizeObserver = new ResizeObserver(() => {
      if (this.selectedTarget) {
        this.positionOverlay(this.selectedOverlay, this.selectedTarget);
      }
    });
  }

  /**
   * 开启点选模式：capture 阶段绑定事件，body 加 crosshair 光标
   */
  enable(): void {
    if (this.isInspecting) {
      return;
    }
    this.isInspecting = true;
    document.addEventListener('mouseover', this.onHover, true);
    document.addEventListener('mousemove', this.onMove, true);
    document.addEventListener('click', this.onClick, true);
    document.addEventListener('scroll', this.onScrollResize, true);
    window.addEventListener('resize', this.onScrollResize);
    document.body.style.cursor = 'crosshair';
  }

  /**
   * 关闭点选模式：解绑事件、隐藏 hover overlay、恢复光标
   */
  disable(): void {
    if (!this.isInspecting) {
      return;
    }
    this.isInspecting = false;
    document.removeEventListener('mouseover', this.onHover, true);
    document.removeEventListener('mousemove', this.onMove, true);
    document.removeEventListener('click', this.onClick, true);
    document.removeEventListener('scroll', this.onScrollResize, true);
    window.removeEventListener('resize', this.onScrollResize);
    document.body.style.cursor = '';
    this.hoverTarget = null;
    this.hoverOverlay.style.display = 'none';
  }

  /**
   * 设置持久选中态 overlay（覆盖目标节点）
   *
   * 同时挂载 ResizeObserver：用户在编辑器改样式导致目标重排时，
   * overlay 自动跟随重定位，避免停留在旧尺寸/位置
   * @param el 激活节点
   */
  setSelected(el: HTMLElement): void {
    this.selectedTarget = el;
    // 切换目标前先断开旧观察，避免观察器回调指向已不存在的目标
    this.selectedResizeObserver.disconnect();
    this.selectedResizeObserver.observe(el);
    this.positionOverlay(this.selectedOverlay, el);
  }

  /**
   * 清除持久选中态 overlay
   */
  clearSelected(): void {
    this.selectedResizeObserver.disconnect();
    this.selectedTarget = null;
    this.selectedOverlay.style.display = 'none';
  }

  /**
   * 创建 overlay 元素并附加 BEM modifier class
   * @param modifier 修饰符（hover / selected）
   * @returns overlay div
   */
  protected createOverlay(modifier: 'hover' | 'selected'): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.className = `${OVERLAY_BLOCK} ${OVERLAY_BLOCK}--${modifier}`;
    overlay.style.display = 'none';
    return overlay;
  }

  /**
   * mouseover 处理：更新 hover overlay 覆盖当前目标
   */
  protected onHover = (e: MouseEvent): void => {
    if (!this.isInspecting) {
      return;
    }
    const target = e.target as HTMLElement;
    // 排除调试面板自身元素
    if (this.panelRoot.contains(target)) {
      return;
    }
    this.hoverTarget = target;
    this.positionOverlay(this.hoverOverlay, target);
  };

  /**
   * mousemove 处理：跟随鼠标更新 hover overlay（与 mouseover 双保险）
   */
  protected onMove = (e: MouseEvent): void => {
    if (!this.isInspecting) {
      return;
    }
    const target = e.target as HTMLElement;
    if (this.panelRoot.contains(target)) {
      return;
    }
    if (target !== this.hoverTarget) {
      this.hoverTarget = target;
    }
    this.positionOverlay(this.hoverOverlay, target);
  };

  /**
   * click 处理：capture 阶段拦截，锁定目标节点后关闭点选模式
   */
  protected onClick = (e: MouseEvent): void => {
    if (!this.isInspecting) {
      return;
    }
    const target = e.target as HTMLElement;
    // 点击落在调试面板自身操控区，不作为点选目标
    if (this.panelRoot.contains(target)) {
      return;
    }
    // 阻止默认行为与冒泡，避免触发业务自身点击逻辑
    e.preventDefault();
    e.stopPropagation();
    this.disable();
    this.options.onPick(target);
  };

  /**
   * scroll / resize 处理：重新定位选中态 overlay（应对页面滚动与布局变化）
   */
  protected onScrollResize = (): void => {
    if (this.selectedTarget) {
      this.positionOverlay(this.selectedOverlay, this.selectedTarget);
    }
    if (this.hoverTarget) {
      this.positionOverlay(this.hoverOverlay, this.hoverTarget);
    }
  };

  /**
   * 定位 overlay 覆盖目标元素（position: fixed，视口坐标）
   * @param overlay 悬浮层
   * @param el 目标元素
   */
  protected positionOverlay(overlay: HTMLDivElement, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    overlay.style.display = 'block';
    overlay.style.left = `${rect.left}px`;
    overlay.style.top = `${rect.top}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
  }
}
