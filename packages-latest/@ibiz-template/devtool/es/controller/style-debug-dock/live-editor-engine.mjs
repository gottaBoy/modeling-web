"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LiveEditorEngine {
  constructor() {
    /**
     * 样式变更累积表：key 为 SelectorEngine 计算的选择器串
     */
    __publicField(this, "stylesMap", /* @__PURE__ */ new Map());
    /**
     * 单例覆写 style 标签：实时落盘累积样式，触发浏览器重绘
     */
    __publicField(this, "overrideSheet");
    this.overrideSheet = document.createElement("style");
    this.overrideSheet.id = "style-debug-dock-live-override";
    document.head.append(this.overrideSheet);
  }
  /**
   * 清空累积样式条目并撤销实时注入的页面重绘副作用
   *
   * 单例 style 标签随实例生命周期保留，不删除（避免反复创建/移除 DOM），
   * 仅清空内容；stylesMap 一并清空，下次 initEntry 重新采集
   */
  dispose() {
    this.stylesMap.clear();
    this.overrideSheet.innerHTML = "";
  }
  /**
   * 初始化（或恢复）指定选择器的样式条目
   *
   * 切换激活节点时调用：
   *  - 若 stylesMap 已有该 selector（跨节点往返），恢复历史 styleStr
   *  - 否则用 getComputedStyle 生成初始模板，写入 stylesMap（modified=false）
   *
   * 仅采集「非默认」样式：通过同标签空壳元素的默认计算样式做差集，
   * 过滤掉浏览器/UA 默认值，只保留业务实际声明的样式
   *
   * @param selector 完整 css 选择器（stylesMap key）
   * @param el 目标 DOM 节点（用于读取计算样式）
   * @returns 应回填到编辑器的 styleStr
   */
  initEntry(selector, el) {
    const existed = this.stylesMap.get(selector);
    if (existed) {
      let result = "";
      const existedStyleStr = existed.styleStr || "";
      const related = (existed.relativeSelector || []).map((sel) => {
        var _a;
        return (_a = this.stylesMap.get(sel)) == null ? void 0 : _a.styleStr;
      }).filter(Boolean);
      if (existedStyleStr) {
        result += "".concat(existedStyleStr, "\n");
      }
      if (related.length > 0) {
        result += related.join("\n");
      }
      return result;
    }
    const state = existed ? existed.state : this.computeNonDefaultStyles(el);
    const styleStr = this.buildBlock(selector, state);
    this.stylesMap.set(selector, { state, modified: false, styleStr });
    return styleStr;
  }
  /**
   * 计算元素的非默认样式
   *
   * 通过创建同标签、同父级的空壳元素（无 class / 无 inline style / 无属性）
   * 作为基线：基线元素仅受 UA 样式表 + 父级继承影响，与目标元素的差异
   * 即为目标元素自身 class/style 声明的样式
   *
   * 注意：
   *  - sandbox 必须插入 DOM（与 el 同父级，作为兄弟节点），否则 getComputedStyle
   *    对未挂载元素返回值不可靠，且继承属性无法正确计算
   *  - 不使用 all: unset（那是 CSS initial value，不是 UA 默认值）
   *  - 同父级保证继承属性基线一致，避免父级自定义样式误报
   *
   * @param el 目标 DOM 节点
   * @returns 非默认样式键值对
   */
  computeNonDefaultStyles(el) {
    const cs = window.getComputedStyle(el);
    const parent = el.parentElement;
    if (!parent) {
      const state2 = {};
      for (let i = 0; i < cs.length; i++) {
        const prop = cs.item(i);
        if (prop) {
          state2[prop] = cs.getPropertyValue(prop);
        }
      }
      return state2;
    }
    const sandbox = document.createElement(el.tagName);
    parent.append(sandbox);
    const baseCs = window.getComputedStyle(sandbox);
    const state = {};
    for (let i = 0; i < cs.length; i++) {
      const prop = cs.item(i);
      if (prop) {
        const value = cs.getPropertyValue(prop);
        const baseValue = baseCs.getPropertyValue(prop);
        if (value !== baseValue) {
          state[prop] = value;
        }
      }
    }
    parent.removeChild(sandbox);
    return state;
  }
  /**
   * 用户编辑 textarea 时调用：解析编辑器内容中的所有 CSS 块并按选择器路由
   *
   * 编辑器内容可含多个 `selector { ... }` 块：
   *  - 每个块按选择器写入对应 entry（缺失则新建，空基线，所有属性视为变更）
   *  - 每个 entry 的 styleStr 始终为单块，保证 getExportedCode/injectOverride 的单块解析不变
   *  - 当前选择器块被用户删除时，清空其 styleStr（diff 为空，等同 revert）
   *  - 其他历史 entry 不受本次输入影响
   *
   * @param currentSelector 当前激活选择器
   * @param content 编辑器最新内容（可含多块）
   */
  updateStyleStr(currentSelector, content) {
    var _a;
    const blocks = this.parseBlocks(content);
    const seenSelectors = /* @__PURE__ */ new Set();
    const others = [];
    blocks.forEach(({ selector, props }) => {
      seenSelectors.add(selector);
      if (selector !== currentSelector) {
        others.push(selector);
      }
      let entry = this.stylesMap.get(selector);
      if (!entry) {
        entry = { state: {}, modified: false, styleStr: "" };
        this.stylesMap.set(selector, entry);
      }
      entry.styleStr = this.buildBlock(selector, props);
      entry.modified = true;
    });
    const currentEntry = this.stylesMap.get(currentSelector);
    if (currentEntry) {
      const removedSelectors = [];
      if ((_a = currentEntry.relativeSelector) == null ? void 0 : _a.length) {
        currentEntry.relativeSelector.forEach((sel) => {
          if (!seenSelectors.has(sel)) {
            removedSelectors.push(sel);
          }
        });
      }
      removedSelectors.forEach((sel) => this.stylesMap.delete(sel));
      currentEntry.relativeSelector = others;
      if (!seenSelectors.has(currentSelector)) {
        currentEntry.styleStr = "";
      }
    }
    this.injectOverride();
  }
  /**
   * 聚合所有 modified 条目生成变更样式 Patch（导出区内容）
   *
   * 仅输出用户实际产生变更的属性：
   *  - 解析当前 styleStr 为属性对象
   *  - 与初始 state 比对，仅保留新增 / 值变更的属性
   *  - 删除的属性不输出（用户已从编辑器移除，表示不覆写）
   *  - diff 为空的条目跳过（无实际变更）
   * @returns 变更样式字符串
   */
  getExportedCode() {
    const blocks = [];
    this.stylesMap.forEach((entry, selector) => {
      if (!entry.modified) {
        return;
      }
      const currentProps = this.parseStyleProps(entry.styleStr);
      const diff = this.diffProps(entry.state, currentProps);
      if (Object.keys(diff).length > 0) {
        blocks.push(this.buildBlock(selector, diff));
      }
    });
    if (blocks.length === 0) {
      return "/* \u5C1A\u672A\u4EA7\u751F\u5C40\u90E8\u53D8\u66F4\u6837\u5F0F */";
    }
    return "".concat(blocks.join("\n"));
  }
  /**
   * 解析 CSS 块字符串为属性对象
   *
   * 利用浏览器原生 style.cssText 解析，兼容用户手输时的容错（漏分号、空格等）
   * 保留 !important 优先级（通过 getPropertyPriority 读取并拼接）
   * @param styleStr 完整 CSS 块（selector { ... }）
   * @returns 属性键值对
   */
  parseStyleProps(styleStr) {
    const match = styleStr.match(/\{([\s\S]*)\}/);
    if (!match) {
      return {};
    }
    return this.parsePropsFromCssText(match[1]);
  }
  /**
   * 从 cssText 字符串解析属性键值对
   *
   * 利用浏览器原生 style.cssText 解析，兼容用户手输容错（漏分号、空格等）
   * 保留 !important 优先级（通过 getPropertyPriority 读取并拼接）
   * @param cssText 花括号内的属性串
   * @returns 属性键值对
   */
  parsePropsFromCssText(cssText) {
    const temp = document.createElement("div");
    temp.style.cssText = cssText;
    const props = {};
    for (let i = 0; i < temp.style.length; i++) {
      const prop = temp.style.item(i);
      if (prop) {
        const value = temp.style.getPropertyValue(prop);
        const priority = temp.style.getPropertyPriority(prop);
        props[prop] = priority ? "".concat(value, " !").concat(priority) : value;
      }
    }
    return props;
  }
  /**
   * 解析编辑器内容中的所有 CSS 块
   *
   * 正则 `[^{}]+` / `[^{}]*` 限制单层无嵌套花括号，覆盖常规样式块
   * （本工具场景不涉及 @media 等嵌套规则）
   * @param content 编辑器完整内容（可含多块）
   * @returns 块数组：{ selector, props }
   */
  parseBlocks(content) {
    const blocks = [];
    const regex = /([^{}]+)\{([^{}]*)\}/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const selector = match[1].trim();
      if (!selector) {
        continue;
      }
      blocks.push({
        selector,
        props: this.parsePropsFromCssText(match[2])
      });
    }
    return blocks;
  }
  /**
   * 比对初始 state 与当前属性，仅保留新增 / 值变更的属性
   * @param initial 初始计算样式
   * @param current 当前编辑器解析出的属性
   * @returns 差异属性键值对
   */
  diffProps(initial, current) {
    const diff = {};
    Object.keys(current).forEach((prop) => {
      const cur = current[prop];
      const init = initial[prop];
      if (init === void 0 || init !== cur) {
        diff[prop] = cur;
      }
    });
    return diff;
  }
  /**
   * 聚合 modified 条目的差异属性注入单例 style 标签，触发真实重绘
   *
   * 仅注入用户实际变更的属性（与 getExportedCode 同源 diff 逻辑），
   * 避免未修改的初始 state 以宽泛选择器（如 div）注入后污染页面其他元素
   * （含 devtool 面板与 monaco 编辑器内部 DOM）
   */
  injectOverride() {
    const blocks = [];
    this.stylesMap.forEach((entry, selector) => {
      if (!entry.modified) {
        return;
      }
      const currentProps = this.parseStyleProps(entry.styleStr);
      const diff = this.diffProps(entry.state, currentProps);
      if (Object.keys(diff).length > 0) {
        blocks.push(this.buildBlock(selector, diff));
      }
    });
    this.overrideSheet.innerHTML = blocks.join("\n\n");
  }
  /**
   * 拼装完整 CSS 块（选择器 + 花括号 + 属性）
   * @param selector css 选择器
   * @param state 样式键值对
   * @returns 完整 CSS 块字符串
   */
  buildBlock(selector, state) {
    const props = Object.entries(state).map(([k, v]) => "  ".concat(k, ": ").concat(v, ";")).join("\n");
    return "".concat(selector, " {\n").concat(props, "\n}");
  }
}

export { LiveEditorEngine };
