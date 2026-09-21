import { reactive, createApp } from 'vue';
import { createUUID } from 'qx-util';
import '../components/index.mjs';
import { InspectorEngine } from './style-debug-dock/inspector-engine.mjs';
import { SelectorEngine } from './style-debug-dock/selector-engine.mjs';
import { LiveEditorEngine } from './style-debug-dock/live-editor-engine.mjs';
import { StyleDebugDock } from '../components/style-debug-dock/style-debug-dock.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class StyleDebugDockController {
  constructor() {
    /**
     * 容器 ID
     */
    __publicField(this, "containerId", "style-debug-dock");
    /**
     * 根 DOM 元素
     */
    __publicField(this, "rootElement");
    /**
     * 检查器引擎（点选模式 + overlay 高亮）
     *
     * 延迟到首次 mount 时创建
     */
    __publicField(this, "inspector");
    /**
     * 选择器生成引擎
     */
    __publicField(this, "selectorEngine", new SelectorEngine());
    /**
     * 实时编辑器引擎
     */
    __publicField(this, "liveEditor", new LiveEditorEngine());
    /**
     * 当前激活节点
     */
    __publicField(this, "activeElement", null);
    /**
     * selectorInput 对应的锚点元素（选择器拼接起点）
     */
    __publicField(this, "rootAnchor", null);
    /**
     * 面包屑项 id → DOM 节点 映射（非响应式）
     *
     * 面包屑是导航栈，项的 id 在 selectChild/selectBreadcrumb 时维护，
     * 不随 setActiveElement 刷新子节点而清空
     */
    __publicField(this, "breadcrumbElMap", /* @__PURE__ */ new Map());
    /**
     * 子节点项 id → DOM 节点 映射（非响应式）
     *
     * 子节点列表每次 setActiveElement 都会重建，映射同步清空重建
     */
    __publicField(this, "childElMap", /* @__PURE__ */ new Map());
    /**
     * 响应式状态
     */
    __publicField(this, "state", reactive({
      isShow: false,
      selectorInput: "",
      currentSelector: "",
      cssEditorContent: "",
      breadcrumbs: [],
      childrenList: [],
      selectedChildId: null,
      isPickerActive: false,
      exportedCodeVersion: 0
    }));
    /**
     * 是否已完成首次挂载
     *
     * 调试面板组件初始化使用useUIStore可能会报错，此时还未挂载pinia
     */
    __publicField(this, "isMounted", false);
    /**
     * InspectorEngine 点击锁定回调
     *
     * 点选目标节点：以目标作为锚点，selectorInput 取第一个 + 最后一个 class（无 class 用标签）
     * @param el 点选锁定的目标节点
     */
    __publicField(this, "onPick", (el) => {
      this.state.isPickerActive = false;
      this.liveEditor.dispose();
      this.state.selectorInput = this.selectorEngine.buildAnchorSelector(el);
      this.rootAnchor = el;
      this.setActiveElement(el, true);
    });
  }
  /**
   * 导出的变更样式代码（聚合所有 modified 条目）
   *
   * 读取 state.exportedCodeVersion 建立响应式依赖：
   * stylesMap 是非响应式 Map，无法直接被 Vue 追踪，
   * 通过 onEditorInput 时自增版本号触发模板重算
   */
  get exportedCode() {
    this.state.exportedCodeVersion;
    return this.liveEditor.getExportedCode();
  }
  /**
   * 初始化
   */
  init() {
    this.listenKeyDown();
  }
  /**
   * 挂载面板
   */
  mount() {
    if (this.isMounted) {
      return;
    }
    this.isMounted = true;
    const container = document.createElement("div");
    container.id = this.containerId;
    document.body.append(container);
    this.rootElement = container;
    this.inspector = new InspectorEngine(container, { onPick: this.onPick });
    const app = createApp(StyleDebugDock, { controller: this });
    app.mount(container);
  }
  /**
   * 监听快捷键 (Ctrl+F11)
   */
  listenKeyDown() {
    window.addEventListener("keydown", (event) => {
      var _a;
      if ((event.ctrlKey || event.metaKey) && event.code === "F11") {
        event.preventDefault();
        if ((_a = ibiz.devTool) == null ? void 0 : _a.state.isShow) {
          ibiz.devTool.triggerVisible(false);
        }
        this.triggerVisible();
      }
    });
  }
  /**
   * 切换显隐
   * @param visible 是否显示
   */
  triggerVisible(visible) {
    if (!this.isMounted) {
      this.mount();
    }
    if (visible === void 0) {
      this.state.isShow = !this.state.isShow;
    } else {
      this.state.isShow = visible;
    }
    if (!this.state.isShow) {
      this.clearState();
    }
    this.updateBodyClass();
  }
  /**
   * 清理所有状态
   *
   * 面板关闭时调用：清空两个引擎累积的运行时状态（选中态 overlay、
   * 点选模式、覆写样式），引擎实例本身随控制器生命周期保留复用
   */
  clearState() {
    var _a, _b;
    (_a = this.inspector) == null ? void 0 : _a.clearSelected();
    if (this.state.isPickerActive) {
      this.state.isPickerActive = false;
      (_b = this.inspector) == null ? void 0 : _b.disable();
    }
    this.liveEditor.dispose();
    this.activeElement = null;
    this.rootAnchor = null;
    this.breadcrumbElMap.clear();
    this.childElMap.clear();
    this.state.isPickerActive = false;
    this.state.selectorInput = "";
    this.state.currentSelector = "";
    this.state.cssEditorContent = "";
    this.state.breadcrumbs = [];
    this.state.childrenList = [];
    this.state.selectedChildId = null;
  }
  /**
   * 更新 body 类名
   */
  updateBodyClass() {
    if (this.state.isShow) {
      document.body.classList.add("style-debug-dock-enable");
    } else {
      document.body.classList.remove("style-debug-dock-enable");
    }
  }
  /**
   * 切换元素拾取器
   */
  togglePicker() {
    if (!this.inspector) {
      return;
    }
    this.state.isPickerActive = !this.state.isPickerActive;
    if (this.state.isPickerActive) {
      this.inspector.enable();
    } else {
      this.inspector.disable();
    }
  }
  /**
   * 统一状态同步入口
   *
   * 点选 / 手输 / 面包屑下钻 / 子节点下钻均汇聚于此：
   *  1. 切换选中态 overlay
   *  2. 从 selectorInput 锚点计算完整选择器
   *  3. 刷新子节点列表（真实 DOM）
   *  4. 初始化或恢复编辑器内容
   *
   * @param el 当前激活节点
   * @param resetBreadcrumbs 是否重置面包屑（初始选中时为 true，下钻时为 false）
   */
  setActiveElement(el, resetBreadcrumbs = false) {
    var _a;
    this.activeElement = el;
    (_a = this.inspector) == null ? void 0 : _a.setSelected(el);
    let selector = this.state.selectorInput;
    if (this.rootAnchor && el !== this.rootAnchor) {
      selector = this.selectorEngine.calculate(
        this.state.selectorInput,
        this.rootAnchor,
        el
      );
    }
    this.state.currentSelector = selector;
    if (resetBreadcrumbs) {
      this.breadcrumbElMap.clear();
      const currentItem = this.createBreadcrumbItem(el);
      this.breadcrumbElMap.set(currentItem.id, el);
      this.state.breadcrumbs = [{ id: currentItem.id, name: currentItem.name }];
    }
    const children = this.selectorEngine.buildChildren(el);
    this.childElMap.clear();
    children.forEach((c) => this.childElMap.set(c.id, c.el));
    this.state.childrenList = children.map(({ id, name }) => ({ id, name }));
    this.state.selectedChildId = null;
    this.state.cssEditorContent = this.liveEditor.initEntry(selector, el);
  }
  /**
   * 创建面包屑项
   * @param el DOM 元素
   * @returns 面包屑项
   */
  createBreadcrumbItem(el) {
    return {
      id: createUUID(),
      name: this.selectorEngine.toDisplayName(el),
      el
    };
  }
  /**
   * 手动输入选择器提交（blur 或 Enter 触发）
   *
   * 以命中元素作为锚点，selectorInput 保留用户输入
   */
  onSelectorCommit() {
    const raw = this.state.selectorInput.trim();
    if (!raw) {
      return;
    }
    try {
      const el = document.querySelector(raw);
      if (el) {
        this.liveEditor.dispose();
        this.rootAnchor = el;
        this.setActiveElement(el, true);
      } else {
        ibiz.message.error("\u672A\u627E\u5230\u5339\u914D\u5143\u7D20\uFF0C\u8BF7\u68C0\u67E5\u9009\u62E9\u5668\u8BED\u6CD5\u6216 DOM \u7ED3\u6784");
      }
    } catch (e) {
      ibiz.message.error("\u9009\u62E9\u5668\u8BED\u6CD5\u975E\u6CD5\uFF0C\u8BF7\u68C0\u67E5\u9009\u62E9\u5668\u8BED\u6CD5\u6216 DOM \u7ED3\u6784");
    }
  }
  /**
   * CSS 编辑器输入：实时计算变更并注入
   * @param value 编辑器最新内容
   */
  onEditorInput(value) {
    this.state.cssEditorContent = value;
    const selector = this.state.currentSelector;
    if (selector) {
      this.liveEditor.updateStyleStr(selector, value);
      this.state.exportedCodeVersion++;
    }
  }
  /**
   * 点击面包屑回退到该层节点
   *
   * 仅切换激活节点并截断面包屑，不修改 selectorInput / rootAnchor
   * （selectorInput 仅由用户点选或手输变更）
   * @param item 面包屑项（id 用于在 breadcrumbElMap 中查找对应 DOM 节点）
   */
  selectBreadcrumb(item) {
    const el = this.breadcrumbElMap.get(item.id);
    if (!el) {
      return;
    }
    const index = this.state.breadcrumbs.findIndex((b) => b.id === item.id);
    if (index === -1) {
      return;
    }
    const removed = this.state.breadcrumbs.splice(index + 1);
    removed.forEach((b) => this.breadcrumbElMap.delete(b.id));
    this.setActiveElement(el);
  }
  /**
   * 选择子元素下钻（添加到面包屑）
   * @param child 子元素（id 用于在 childElMap 中查找对应 DOM 节点）
   */
  selectChild(child) {
    const el = this.childElMap.get(child.id);
    if (!el) {
      return;
    }
    const newItem = this.createBreadcrumbItem(el);
    this.breadcrumbElMap.set(newItem.id, el);
    this.state.breadcrumbs.push({ id: newItem.id, name: newItem.name });
    this.setActiveElement(el);
  }
  /**
   * 复制导出的代码
   */
  copyCode() {
    navigator.clipboard.writeText(this.exportedCode).then(() => {
      ibiz.message.success("\u5DF2\u590D\u5236\u53D8\u66F4\u6837\u5F0F\u4EE3\u7801");
    }).catch(() => {
    });
  }
}

export { StyleDebugDockController };
