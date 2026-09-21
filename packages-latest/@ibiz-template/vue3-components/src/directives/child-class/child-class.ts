import { type Directive, type DirectiveBinding } from 'vue';

/**
 * 子元素 class 透传指令的绑定值
 */
export interface ChildClassValue {
  /**
   * @description 要添加到子元素上的 class 类名
   * - 可以是字符串，多个用空格分隔
   * - 也可以是字符串数组
   * @type {(string | string[])}
   * @memberof ChildClassValue
   */
  class?: string | string[];
  /**
   * @description 子元素选择器，用于在当前元素内部查找目标子元素
   * @type {string}
   * @memberof ChildClassValue
   */
  selector: string;
}

/**
 * 解析 class 字符串为数组
 */
function parseClass(cls?: string | string[]): string[] {
  if (!cls) return [];
  if (Array.isArray(cls)) return cls.filter(Boolean);
  return cls.split(/\s+/).filter(Boolean);
}

/**
 * 应用 class 到目标子元素（仅追加，不删除已存在的 class）
 */
function applyClass(el: HTMLElement, childClass?: ChildClassValue[]): void {
  if (!childClass || !childClass.length) return;
  childClass.forEach(child => {
    const elements = el.querySelectorAll(child.selector);
    if (!elements.length) return;
    const classes = parseClass(child.class);
    if (classes.length) {
      elements.forEach(element => {
        classes.forEach(className => {
          if (!element.classList.contains(className)) {
            element.classList.add(className);
          }
        });
      });
    }
  });
}

/**
 * 子元素 class 透传指令
 *
 * @description 用于将 class 透传到组件内部某个子元素上（如 Element Plus 的 `.el-checkbox-button__inner`）。
 * 仅在元素挂载时从当前元素内部按 selector 查找子元素，**追加**传入的 class（不会删除子元素已有的 class）。
 * 绑定值变化时不会再次应用，以避免 class 重复累积。
 *
 * @example
 * ```tsx
 * <el-checkbox-button
 *   v-child-class={[[{ class: textCls, selector: '.el-checkbox-button__inner' }]]}
 * />
 * ```
 */
export const vChildClass: Directive<HTMLElement, ChildClassValue[]> = {
  mounted(el, binding: DirectiveBinding<ChildClassValue[]>) {
    applyClass(el, binding.value ?? undefined);
  },

  updated(el, binding: DirectiveBinding<ChildClassValue[]>) {
    applyClass(el, binding.value ?? undefined);
  },
};
