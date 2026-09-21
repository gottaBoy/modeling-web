/* eslint-disable no-plusplus */
import { createApp, reactive } from 'vue';
import { createUUID } from 'qx-util';
import { StyleDebugDock } from '../components';
import {
  IStyleDebugDockController,
  IStyleDebugDockControllerState,
} from '../interface/i-style-debug-dock-controller';
import { InspectorEngine } from './style-debug-dock/inspector-engine';
import { SelectorEngine } from './style-debug-dock/selector-engine';
import { LiveEditorEngine } from './style-debug-dock/live-editor-engine';

/**
 * 样式调试面板控制器
 *
 * 组合三个引擎协作：
 *  - InspectorEngine：运行时元素点选（overlay 高亮，不污染目标元素）
 *  - SelectorEngine：从 selectorInput 锚点逐层拼接选择器、构建面包屑与子节点
 *  - LiveEditorEngine：stylesMap 累积、实时注入覆写样式、聚合变更 Patch
 *
 * @author tony001
 * @date 2025-03-24
 */
export class StyleDebugDockController implements IStyleDebugDockController {
  /**
   * 容器 ID
   */
  protected containerId = 'style-debug-dock';

  /**
   * 根 DOM 元素
   */
  rootElement?: HTMLElement;

  /**
   * 检查器引擎（点选模式 + overlay 高亮）
   *
   * 延迟到首次 mount 时创建
   */
  protected inspector?: InspectorEngine;

  /**
   * 选择器生成引擎
   */
  protected selectorEngine = new SelectorEngine();

  /**
   * 实时编辑器引擎
   */
  protected liveEditor = new LiveEditorEngine();

  /**
   * 当前激活节点
   */
  protected activeElement: HTMLElement | null = null;

  /**
   * selectorInput 对应的锚点元素（选择器拼接起点）
   */
  protected rootAnchor: HTMLElement | null = null;

  /**
   * 面包屑项 id → DOM 节点 映射（非响应式）
   *
   * 面包屑是导航栈，项的 id 在 selectChild/selectBreadcrumb 时维护，
   * 不随 setActiveElement 刷新子节点而清空
   */
  protected breadcrumbElMap: Map<string, HTMLElement> = new Map();

  /**
   * 子节点项 id → DOM 节点 映射（非响应式）
   *
   * 子节点列表每次 setActiveElement 都会重建，映射同步清空重建
   */
  protected childElMap: Map<string, HTMLElement> = new Map();

  /**
   * 响应式状态
   */
  state: IStyleDebugDockControllerState = reactive({
    isShow: false,
    selectorInput: '',
    currentSelector: '',
    cssEditorContent: '',
    breadcrumbs: [],
    childrenList: [],
    selectedChildId: null,
    isPickerActive: false,
    exportedCodeVersion: 0,
  });

  /**
   * 导出的变更样式代码（聚合所有 modified 条目）
   *
   * 读取 state.exportedCodeVersion 建立响应式依赖：
   * stylesMap 是非响应式 Map，无法直接被 Vue 追踪，
   * 通过 onEditorInput 时自增版本号触发模板重算
   */
  get exportedCode(): string {
    // eslint-disable-next-line no-unused-expressions
    this.state.exportedCodeVersion;
    return this.liveEditor.getExportedCode();
  }

  /**
   * 是否已完成首次挂载
   *
   * 调试面板组件初始化使用useUIStore可能会报错，此时还未挂载pinia
   */
  protected isMounted = false;

  /**
   * 初始化
   */
  init(): void {
    this.listenKeyDown();
  }

  /**
   * 挂载面板
   */
  mount(): void {
    if (this.isMounted) {
      return;
    }
    this.isMounted = true;
    const container = document.createElement('div');
    container.id = this.containerId;
    document.body.append(container);
    this.rootElement = container;
    // 实例化检查器引擎，以面板根容器作为点选排除边界
    this.inspector = new InspectorEngine(container, { onPick: this.onPick });
    const app = createApp(StyleDebugDock, { controller: this });
    app.mount(container);
  }

  /**
   * 监听快捷键 (Ctrl+F11)
   */
  listenKeyDown(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      // Ctrl/Cmd+F11 触发显隐
      if ((event.ctrlKey || event.metaKey) && event.code === 'F11') {
        event.preventDefault();
        // 互斥：打开样式调试面板时关闭开发工具
        if (ibiz.devTool?.state.isShow) {
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
  triggerVisible(visible?: boolean): void {
    // 首次触发显隐时延迟挂载面板 DOM 与 Vue 应用
    if (!this.isMounted) {
      this.mount();
    }
    if (visible === undefined) {
      this.state.isShow = !this.state.isShow;
    } else {
      this.state.isShow = visible;
    }
    // 关闭面板时清理状态
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
  protected clearState(): void {
    // 清除选中态 overlay
    this.inspector?.clearSelected();
    // 如果点选模式开启，关闭它
    if (this.state.isPickerActive) {
      this.state.isPickerActive = false;
      this.inspector?.disable();
    }
    // 清空累积样式条目与覆写 style 标签内容
    this.liveEditor.dispose();
    // 重置内部状态
    this.activeElement = null;
    this.rootAnchor = null;
    this.breadcrumbElMap.clear();
    this.childElMap.clear();
    // 重置响应式状态到初始值
    this.state.isPickerActive = false;
    this.state.selectorInput = '';
    this.state.currentSelector = '';
    this.state.cssEditorContent = '';
    this.state.breadcrumbs = [];
    this.state.childrenList = [];
    this.state.selectedChildId = null;
  }

  /**
   * 更新 body 类名
   */
  protected updateBodyClass(): void {
    if (this.state.isShow) {
      document.body.classList.add('style-debug-dock-enable');
    } else {
      document.body.classList.remove('style-debug-dock-enable');
    }
  }

  /**
   * 切换元素拾取器
   */
  togglePicker(): void {
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
   * InspectorEngine 点击锁定回调
   *
   * 点选目标节点：以目标作为锚点，selectorInput 取第一个 + 最后一个 class（无 class 用标签）
   * @param el 点选锁定的目标节点
   */
  protected onPick = (el: HTMLElement): void => {
    this.state.isPickerActive = false;
    // 切换根锚点，丢弃上一轮累积的样式条目
    this.liveEditor.dispose();
    this.state.selectorInput = this.selectorEngine.buildAnchorSelector(el);
    this.rootAnchor = el;
    this.setActiveElement(el, true);
  };

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
  setActiveElement(el: HTMLElement, resetBreadcrumbs = false): void {
    this.activeElement = el;
    // 1. 选中态 overlay 更新
    this.inspector?.setSelected(el);
    // 2. 计算完整选择器（激活节点即锚点时取 selectorInput，否则从锚点逐层拼接）
    let selector = this.state.selectorInput;
    if (this.rootAnchor && el !== this.rootAnchor) {
      selector = this.selectorEngine.calculate(
        this.state.selectorInput,
        this.rootAnchor,
        el,
      );
    }
    this.state.currentSelector = selector;
    // 3. 重置面包屑：清空 breadcrumbElMap，以当前元素作为面包屑起点
    if (resetBreadcrumbs) {
      this.breadcrumbElMap.clear();
      const currentItem = this.createBreadcrumbItem(el);
      this.breadcrumbElMap.set(currentItem.id, el);
      this.state.breadcrumbs = [{ id: currentItem.id, name: currentItem.name }];
    }
    // 4. 重建子节点列表与 childElMap
    const children = this.selectorEngine.buildChildren(el);
    this.childElMap.clear();
    children.forEach(c => this.childElMap.set(c.id, c.el));
    this.state.childrenList = children.map(({ id, name }) => ({ id, name }));
    this.state.selectedChildId = null;
    // 5. 编辑器内容：初始模板或恢复历史 styleStr
    this.state.cssEditorContent = this.liveEditor.initEntry(selector, el);
  }

  /**
   * 创建面包屑项
   * @param el DOM 元素
   * @returns 面包屑项
   */
  protected createBreadcrumbItem(el: HTMLElement): {
    id: string;
    name: string;
    el: HTMLElement;
  } {
    return {
      id: createUUID(),
      name: this.selectorEngine.toDisplayName(el),
      el,
    };
  }

  /**
   * 手动输入选择器提交（blur 或 Enter 触发）
   *
   * 以命中元素作为锚点，selectorInput 保留用户输入
   */
  onSelectorCommit(): void {
    const raw = this.state.selectorInput.trim();
    if (!raw) {
      return;
    }
    try {
      const el = document.querySelector(raw) as HTMLElement | null;
      if (el) {
        // 切换根锚点，丢弃上一轮累积的样式条目
        this.liveEditor.dispose();
        this.rootAnchor = el;
        this.setActiveElement(el, true);
      } else {
        ibiz.message.error('未找到匹配元素，请检查选择器语法或 DOM 结构');
      }
    } catch {
      ibiz.message.error('选择器语法非法，请检查选择器语法或 DOM 结构');
    }
  }

  /**
   * CSS 编辑器输入：实时计算变更并注入
   * @param value 编辑器最新内容
   */
  onEditorInput(value: string): void {
    this.state.cssEditorContent = value;
    const selector = this.state.currentSelector;
    if (selector) {
      this.liveEditor.updateStyleStr(selector, value);
      // 自增版本号，触发 exportedCode getter 重算
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
  selectBreadcrumb(item: { id: string; name: string }): void {
    const el = this.breadcrumbElMap.get(item.id);
    if (!el) {
      return;
    }
    // 找到点击项在面包屑中的索引
    const index = this.state.breadcrumbs.findIndex(b => b.id === item.id);
    if (index === -1) {
      return;
    }
    // 截断面包屑到点击项，同步移除被截断项的 elMap 映射
    const removed = this.state.breadcrumbs.splice(index + 1);
    removed.forEach(b => this.breadcrumbElMap.delete(b.id));
    // 仅切换激活节点，不改 selectorInput / rootAnchor
    this.setActiveElement(el);
  }

  /**
   * 选择子元素下钻（添加到面包屑）
   * @param child 子元素（id 用于在 childElMap 中查找对应 DOM 节点）
   */
  selectChild(child: { id: string; name: string }): void {
    const el = this.childElMap.get(child.id);
    if (!el) {
      return;
    }
    // 创建新的面包屑项并添加到 breadcrumbElMap
    const newItem = this.createBreadcrumbItem(el);
    this.breadcrumbElMap.set(newItem.id, el);
    this.state.breadcrumbs.push({ id: newItem.id, name: newItem.name });
    // 激活子元素，不重置面包屑
    this.setActiveElement(el);
  }

  /**
   * 复制导出的代码
   */
  copyCode(): void {
    navigator.clipboard
      .writeText(this.exportedCode)
      .then(() => {
        ibiz.message.success('已复制变更样式代码');
      })
      .catch(() => {
        // 静默失败
      });
  }
}
