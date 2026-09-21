/* eslint-disable no-restricted-syntax */
import { createUUID } from 'qx-util';
import type { IChildItem } from './types';

/**
 * 选择器生成引擎
 *
 * 职责：
 *  - 区分两种选择器取值规则：
 *    1) 点选锚点 selectorInput：第一个 class + 最后一个 class，无 class 用标签选择器
 *    2) 面包屑/子节点下钻 token：>2 个 class 取前 2，1 个取 1 个，无 class 用标签 + :nth-child(n)
 *  - 从 selectorInput 锚点开始，自顶向下逐层拼接当前激活节点的完整 css 选择器
 *  - 构建子节点列表（真实 DOM）
 *
 * @author tony001
 * @date 2025-03-24
 */
export class SelectorEngine {
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
  calculate(
    rootSelector: string,
    rootEl: HTMLElement,
    targetEl: HTMLElement,
  ): string {
    // 激活节点即锚点本身，直接返回 selectorInput
    if (targetEl === rootEl) {
      return rootSelector;
    }

    // 自底向上收集 target 到 root（不含 root）的路径
    const chain: HTMLElement[] = [];
    let cur: HTMLElement | null = targetEl;
    while (cur && cur !== rootEl) {
      chain.unshift(cur);
      cur = cur.parentElement;
    }
    // target 不在 root 子树内，降级返回 selectorInput
    if (!cur) {
      return rootSelector;
    }

    // 从 selectorInput 开始逐层拼接（每层用面包屑 token 规则）
    const segments: string[] = [rootSelector];
    for (const el of chain) {
      segments.push(this.buildBreadcrumbSelector(el));
    }
    return segments.join(' > ');
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
  buildAnchorSelector(el: HTMLElement): string {
    const classes = this.filterClasses(el);
    if (classes.length >= 2) {
      return `.${classes[0]}.${classes[classes.length - 1]}`;
    }
    if (classes.length === 1) {
      return `.${classes[0]}`;
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
  buildBreadcrumbSelector(el: HTMLElement): string {
    const classes = this.filterClasses(el);
    if (classes.length > 0) {
      // slice(0, 2)：length=1 取 1 个，length=2 取 2 个，length>2 取前 2 个
      return `.${classes.slice(0, 2).join('.')}`;
    }
    // 无 class：标签 + nth-child 兄弟消歧
    let token = el.tagName.toLowerCase();
    if (el.parentElement) {
      const siblings = Array.from(el.parentElement.children);
      if (siblings.length > 1) {
        token += `:nth-child(${siblings.indexOf(el) + 1})`;
      }
    }
    return token;
  }

  /**
   * 构建子节点列表：激活节点的 element.children（真实 DOM）
   * @param targetEl 当前激活节点
   * @returns 子节点数组
   */
  buildChildren(targetEl: HTMLElement): IChildItem[] {
    return Array.from(targetEl.children).map(el => ({
      id: createUUID(),
      name: this.toDisplayName(el as HTMLElement),
      el: el as HTMLElement,
    }));
  }

  /**
   * 过滤调试器自身注入的干扰类，避免污染选择器
   * @param el DOM 节点
   * @returns 业务 class 数组
   */
  protected filterClasses(el: HTMLElement): string[] {
    return Array.from(el.classList).filter(
      c => !c.startsWith('style-debug-dock') && !c.startsWith('devtool-'),
    );
  }

  /**
   * 生成展示名称：首个 class（.xxx）或标签名（<tag>）
   * @param el DOM 节点
   * @returns 展示名称
   */
  toDisplayName(el: HTMLElement): string {
    const cls = this.filterClasses(el)[0];
    return cls ? `.${cls}` : `<${el.tagName.toLowerCase()}>`;
  }
}
