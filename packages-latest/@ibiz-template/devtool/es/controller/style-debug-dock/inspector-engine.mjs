"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const OVERLAY_BLOCK = "ibiz-style-debug-dock-overlay";
class InspectorEngine {
  constructor(panelRoot, options) {
    /**
     * 悬停高亮 overlay（主题色虚线，跟随鼠标）
     */
    __publicField(this, "hoverOverlay");
    /**
     * 选中锁定 overlay（主题色实线，持续显示当前激活节点）
     */
    __publicField(this, "selectedOverlay");
    /**
     * 调试面板根容器（点选时排除面板自身元素）
     */
    __publicField(this, "panelRoot");
    /**
     * 引擎配置（含点击锁定回调）
     */
    __publicField(this, "options");
    /**
     * 是否处于点选模式
     */
    __publicField(this, "isInspecting", false);
    /**
     * 当前悬停目标节点
     */
    __publicField(this, "hoverTarget", null);
    /**
     * 当前选中锁定节点（用于 scroll/resize 时重新定位 selectedOverlay）
     */
    __publicField(this, "selectedTarget", null);
    /**
     * 选中节点尺寸观察器：样式变更导致目标重排时，实时重定位 selectedOverlay
     */
    __publicField(this, "selectedResizeObserver");
    /**
     * mouseover 处理：更新 hover overlay 覆盖当前目标
     */
    __publicField(this, "onHover", (e) => {
      if (!this.isInspecting) {
        return;
      }
      const target = e.target;
      if (this.panelRoot.contains(target)) {
        return;
      }
      this.hoverTarget = target;
      this.positionOverlay(this.hoverOverlay, target);
    });
    /**
     * mousemove 处理：跟随鼠标更新 hover overlay（与 mouseover 双保险）
     */
    __publicField(this, "onMove", (e) => {
      if (!this.isInspecting) {
        return;
      }
      const target = e.target;
      if (this.panelRoot.contains(target)) {
        return;
      }
      if (target !== this.hoverTarget) {
        this.hoverTarget = target;
      }
      this.positionOverlay(this.hoverOverlay, target);
    });
    /**
     * click 处理：capture 阶段拦截，锁定目标节点后关闭点选模式
     */
    __publicField(this, "onClick", (e) => {
      if (!this.isInspecting) {
        return;
      }
      const target = e.target;
      if (this.panelRoot.contains(target)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      this.disable();
      this.options.onPick(target);
    });
    /**
     * scroll / resize 处理：重新定位选中态 overlay（应对页面滚动与布局变化）
     */
    __publicField(this, "onScrollResize", () => {
      if (this.selectedTarget) {
        this.positionOverlay(this.selectedOverlay, this.selectedTarget);
      }
      if (this.hoverTarget) {
        this.positionOverlay(this.hoverOverlay, this.hoverTarget);
      }
    });
    this.panelRoot = panelRoot;
    this.options = options;
    this.hoverOverlay = this.createOverlay("hover");
    this.selectedOverlay = this.createOverlay("selected");
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
  enable() {
    if (this.isInspecting) {
      return;
    }
    this.isInspecting = true;
    document.addEventListener("mouseover", this.onHover, true);
    document.addEventListener("mousemove", this.onMove, true);
    document.addEventListener("click", this.onClick, true);
    document.addEventListener("scroll", this.onScrollResize, true);
    window.addEventListener("resize", this.onScrollResize);
    document.body.style.cursor = "crosshair";
  }
  /**
   * 关闭点选模式：解绑事件、隐藏 hover overlay、恢复光标
   */
  disable() {
    if (!this.isInspecting) {
      return;
    }
    this.isInspecting = false;
    document.removeEventListener("mouseover", this.onHover, true);
    document.removeEventListener("mousemove", this.onMove, true);
    document.removeEventListener("click", this.onClick, true);
    document.removeEventListener("scroll", this.onScrollResize, true);
    window.removeEventListener("resize", this.onScrollResize);
    document.body.style.cursor = "";
    this.hoverTarget = null;
    this.hoverOverlay.style.display = "none";
  }
  /**
   * 设置持久选中态 overlay（覆盖目标节点）
   *
   * 同时挂载 ResizeObserver：用户在编辑器改样式导致目标重排时，
   * overlay 自动跟随重定位，避免停留在旧尺寸/位置
   * @param el 激活节点
   */
  setSelected(el) {
    this.selectedTarget = el;
    this.selectedResizeObserver.disconnect();
    this.selectedResizeObserver.observe(el);
    this.positionOverlay(this.selectedOverlay, el);
  }
  /**
   * 清除持久选中态 overlay
   */
  clearSelected() {
    this.selectedResizeObserver.disconnect();
    this.selectedTarget = null;
    this.selectedOverlay.style.display = "none";
  }
  /**
   * 创建 overlay 元素并附加 BEM modifier class
   * @param modifier 修饰符（hover / selected）
   * @returns overlay div
   */
  createOverlay(modifier) {
    const overlay = document.createElement("div");
    overlay.className = "".concat(OVERLAY_BLOCK, " ").concat(OVERLAY_BLOCK, "--").concat(modifier);
    overlay.style.display = "none";
    return overlay;
  }
  /**
   * 定位 overlay 覆盖目标元素（position: fixed，视口坐标）
   * @param overlay 悬浮层
   * @param el 目标元素
   */
  positionOverlay(overlay, el) {
    const rect = el.getBoundingClientRect();
    overlay.style.display = "block";
    overlay.style.left = "".concat(rect.left, "px");
    overlay.style.top = "".concat(rect.top, "px");
    overlay.style.width = "".concat(rect.width, "px");
    overlay.style.height = "".concat(rect.height, "px");
  }
}

export { InspectorEngine };
