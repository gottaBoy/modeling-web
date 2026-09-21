import { createUUID } from 'qx-util';

"use strict";
class SelectorEngine {
  /**
   * 计算从锚点到目标节点的完整选择器
   *
   * 每一层选择器值从 selectorInput 开始逐层拼接：
   *   selectorInput > breadcrumbToken > ...
   *
   * 中间层 token 采用面包屑规则（前 2/1 class，无 class 用标签 + nth-child）
   *
   * @param rootSelector selectorInput 对应的选择器串（锚点起始段）
   * @param rootEl selectorInput 对应的锚点元素
   * @param targetEl 当前激活节点（须在锚点子树内或即锚点本身）
   * @returns 完整 css 选择器字符串
   */
  calculate(rootSelector, rootEl, targetEl) {
    if (targetEl === rootEl) {
      return rootSelector;
    }
    const chain = [];
    let cur = targetEl;
    while (cur && cur !== rootEl) {
      chain.unshift(cur);
      cur = cur.parentElement;
    }
    if (!cur) {
      return rootSelector;
    }
    const segments = [rootSelector];
    for (const el of chain) {
      segments.push(this.buildBreadcrumbSelector(el));
    }
    return segments.join(" > ");
  }
  /**
   * 点选锚点 selectorInput 取值规则：
   *  - 有 class：第一个 class + 最后一个 class（.first.last）
   *  - 仅 1 个 class：.cls
   *  - 无 class：标签选择器
   *
   * 同时剔除调试器自身注入的干扰类，避免污染选择器
   * @param el 点选锁定的目标节点
   * @returns selectorInput 值
   */
  buildAnchorSelector(el) {
    const classes = this.filterClasses(el);
    if (classes.length >= 2) {
      return ".".concat(classes[0], ".").concat(classes[classes.length - 1]);
    }
    if (classes.length === 1) {
      return ".".concat(classes[0]);
    }
    return el.tagName.toLowerCase();
  }
  /**
   * 面包屑/子节点下钻 token 取值规则：
   *  - class 数 > 2：取前 2 个 class（.a.b）
   *  - class 数为 1 或 2：取前 min(2, length) 个 class（即 1 个或 2 个）
   *  - 无 class：标签选择器 + :nth-child(n) 伪元素消歧
   * @param el 路径上的子节点
   * @returns 单层 token
   */
  buildBreadcrumbSelector(el) {
    const classes = this.filterClasses(el);
    if (classes.length > 0) {
      return ".".concat(classes.slice(0, 2).join("."));
    }
    let token = el.tagName.toLowerCase();
    if (el.parentElement) {
      const siblings = Array.from(el.parentElement.children);
      if (siblings.length > 1) {
        token += ":nth-child(".concat(siblings.indexOf(el) + 1, ")");
      }
    }
    return token;
  }
  /**
   * 构建子节点列表：激活节点的 element.children（真实 DOM）
   * @param targetEl 当前激活节点
   * @returns 子节点数组
   */
  buildChildren(targetEl) {
    return Array.from(targetEl.children).map((el) => ({
      id: createUUID(),
      name: this.toDisplayName(el),
      el
    }));
  }
  /**
   * 过滤调试器自身注入的干扰类，避免污染选择器
   * @param el DOM 节点
   * @returns 业务 class 数组
   */
  filterClasses(el) {
    return Array.from(el.classList).filter(
      (c) => !c.startsWith("style-debug-dock") && !c.startsWith("devtool-")
    );
  }
  /**
   * 生成展示名称：首个 class（.xxx）或标签名（<tag>）
   * @param el DOM 节点
   * @returns 展示名称
   */
  toDisplayName(el) {
    const cls = this.filterClasses(el)[0];
    return cls ? ".".concat(cls) : "<".concat(el.tagName.toLowerCase(), ">");
  }
}

export { SelectorEngine };
