/**
 * 子节点项：激活节点的 element.children 真实子节点
 */
export interface IChildItem {
  /**
   * 唯一标识
   */
  id: string;

  /**
   * 展示名称：首个 class（.xxx）或标签名（<tag>）
   */
  name: string;

  /**
   * 对应 DOM 节点（点击下钻）
   */
  el: HTMLElement;
}

/**
 * 样式条目：LiveEditorEngine 的 stylesMap value 结构
 *
 * key 为 SelectorEngine 计算出的 css 选择器字符串（非 DOM 元素）
 */
export interface IStyleEntry {
  /**
   * 初始样式对象（window.getComputedStyle 快照）
   */
  state: Record<string, string>;

  /**
   * 是否被用户修改过
   */
  modified: boolean;

  /**
   * 实时样式字符串（完整 CSS 块，含选择器与花括号）
   */
  styleStr: string;

  /**
   * 当前选择器编辑期间追加的其他选择器标识（stylesMap key）
   *
   * initEntry 命中已存在 entry 时，按此列表从 stylesMap 取对应 styleStr
   * 拼接返回，使切换回该选择器时编辑器仍展示当时追加的块
   */
  relativeSelector?: string[];
}

/**
 * InspectorEngine 配置项
 */
export interface IInspectorOptions {
  /**
   * 点击锁定目标节点回调
   */
  onPick: (el: HTMLElement) => void;
}
