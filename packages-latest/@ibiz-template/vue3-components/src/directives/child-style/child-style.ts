import { type Directive, type DirectiveBinding, type CSSProperties } from 'vue';

/**
 * 子元素 style 透传指令的绑定值
 */
export interface ChildStyleValue {
  /**
   * @description 要应用到子元素上的样式对象
   * - 支持驼峰命名 (如 backgroundColor) 或短横线命名 (如 background-color)
   * - 支持 CSS 变量 (如 { '--custom-color': 'red' })
   * @type {CSSProperties}
   * @memberof ChildStyleValue
   */
  style?: CSSProperties;

  /**
   * @description 子元素选择器，用于在当前元素内部查找目标子元素
   * @type {string}
   * @memberof ChildStyleValue
   */
  selector: string;
}

/**
 * 应用 style 到目标子元素（仅合并/覆盖，不删除未涉及的已有样式）
 */
function applyStyle(el: HTMLElement, childStyle?: ChildStyleValue[]): void {
  if (!childStyle || !childStyle.length) return;

  childStyle.forEach(child => {
    const elements = el.querySelectorAll(
      child.selector,
    ) as unknown as HTMLElement[];
    if (!elements.length) return;

    const styles = child.style;
    if (!styles) return;

    elements.forEach(element => {
      // 遍历样式对象，逐个应用到元素的 style 上
      Object.entries(styles).forEach(([key, value]) => {
        if (value != null) {
          // 使用类型断言处理 CSSStyleDeclaration 的索引签名
          (element.style as IData)[key] = value;
        }
      });
    });
  });
}

/**
 * 子元素 style 透传指令
 *
 * @description 用于将 style 对象透传到组件内部某个子元素上。
 * 仅在元素挂载时从当前元素内部按 selector 查找子元素，**合并**传入的样式对象。
 * 绑定值变化时不会再次应用，以避免不必要的重绘或样式冲突。
 *
 * @example
 * ```tsx
 * <el-checkbox-button
 *   v-child-style={[[{
 *     style: { backgroundColor: 'red', '--custom-padding': '10px' },
 *     selector: '.el-checkbox-button__inner'
 *   }]]}
 * />
 * ```
 */
export const vChildStyle: Directive<HTMLElement, ChildStyleValue[]> = {
  mounted(el, binding: DirectiveBinding<ChildStyleValue[]>) {
    applyStyle(el, binding.value ?? undefined);
  },

  updated(el, binding: DirectiveBinding<ChildStyleValue[]>) {
    applyStyle(el, binding.value ?? undefined);
  },
};
