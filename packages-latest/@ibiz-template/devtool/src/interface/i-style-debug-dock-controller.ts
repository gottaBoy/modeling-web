/**
 * 样式调试面板状态接口
 * @author tony001
 * @date 2025-03-24
 */
export interface IStyleDebugDockControllerState {
  /**
   * 是否显示
   */
  isShow: boolean;

  /**
   * CSS 选择器输入值（点选目标节点的 class 类，或用户手动输入）
   */
  selectorInput: string;

  /**
   * 当前激活节点对应的完整 css 选择器（stylesMap key）
   */
  currentSelector: string;

  /**
   * CSS 编辑器内容（实际业务计算样式，非仿真数据）
   */
  cssEditorContent: string;

  /**
   * 面包屑路径：基于真实 DOM 层级链构建（仅展示 id/name，el 由控制器 elMap 维护）
   */
  breadcrumbs: { id: string; name: string }[];

  /**
   * 子元素列表：激活节点的 element.children（仅展示 id/name，el 由控制器 elMap 维护）
   */
  childrenList: { id: string; name: string }[];

  /**
   * 当前选中子元素 ID
   */
  selectedChildId: string | null;

  /**
   * 拾取器是否激活
   */
  isPickerActive: boolean;

  /**
   * 导出代码版本号（每次 updateStyleStr 自增，触发 exportedCode 重算）
   *
   * stylesMap 是非响应式 Map，exportedCode getter 无法直接被 Vue 追踪，
   * 通过此版本号作为响应式依赖，让模板中 controller.exportedCode 重新求值
   */
  exportedCodeVersion: number;
}

/**
 * 样式调试面板控制器接口
 * @author tony001
 * @date 2025-03-24
 */
export interface IStyleDebugDockController {
  /**
   * 响应式状态
   */
  state: IStyleDebugDockControllerState;

  /**
   * 根 DOM 元素
   */
  rootElement?: HTMLElement;

  /**
   * 初始化
   */
  init(): void;

  /**
   * 挂载面板
   */
  mount(): void;

  /**
   * 监听快捷键 (Ctrl+F11)
   */
  listenKeyDown(): void;

  /**
   * 切换显隐
   * @param visible 是否显示，不传则切换
   */
  triggerVisible(visible?: boolean): void;

  /**
   * 切换元素拾取器
   */
  togglePicker(): void;

  /**
   * 手动输入选择器提交（blur 或 Enter 触发）
   */
  onSelectorCommit(): void;

  /**
   * CSS 编辑器输入：实时计算变更并注入
   * @param value 编辑器最新内容
   */
  onEditorInput(value: string): void;

  /**
   * 点击面包屑下钻到该层节点
   * @param item 面包屑项（id 用于在 elMap 中查找对应 DOM 节点）
   */
  selectBreadcrumb(item: { id: string; name: string }): void;

  /**
   * 选择子元素下钻
   * @param child 子元素（id 用于在 elMap 中查找对应 DOM 节点）
   */
  selectChild(child: { id: string; name: string }): void;

  /**
   * 复制导出的代码
   */
  copyCode(): void;

  /**
   * 导出的变更样式代码
   */
  readonly exportedCode: string;
}
