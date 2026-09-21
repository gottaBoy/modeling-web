export const defaultNamespace = 'ibiz';
const statePrefix = 'is-';

/**
 * @description 拼接css bem命名
 * @param {string} namespace 命名空间
 * @param {string} block 块
 * @param {string} [blockSuffix] 块后缀
 * @param {string} [element] 元素
 * @param {string} [modifier] 修饰符
 * @example
 * ```typescript
 * _bem('ibiz', 'layout') => ibiz-layout
 * _bem('ibiz', 'layout', '', 'title') => ibiz-layout__title
 * _bem('ibiz', 'layout', '', '', 'right') => ibiz-layout--right
 * _bem('ibiz', 'layout', '', 'title', 'right') => ibiz-layout__title--right
 * _bem('ibiz', 'layout', 'header', 'title', 'right') => ibiz-layout-header__title--right
 * ```
 * @returns {*}  {string}
 */
function _bem(
  namespace: string,
  block: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string,
): string {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
}

/**
 * @description 全局样式处理命名空间
 * @export
 * @class Namespace
 */
export class Namespace {
  /**
   * @description 命名空间
   * @type {string}
   * @memberof Namespace
   */
  namespace: string;

  /**
   * Creates an instance of Namespace.
   * @param {string} block 当前命名空间的根模块,例如组件的名称
   * @param {string} [namespace] 指定命名空间，未指定使用默认值 ibiz
   * @memberof Namespace
   */
  constructor(
    protected block: string,
    namespace?: string,
  ) {
    this.namespace = namespace || defaultNamespace;
  }

  /**
   * @description namespace-block、namespace-block-blockSuffix
   * @param {string} [blockSuffix='']
   * @returns {*}  {string}
   * @memberof Namespace
   */
  b(blockSuffix: string = ''): string {
    return _bem(this.namespace, this.block, blockSuffix, '', '');
  }

  /**
   * @description namespace-block__element
   * @param {string} [element]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  e(element?: string): string {
    return element ? _bem(this.namespace, this.block, '', element, '') : '';
  }

  /**
   * @description namespace-block--modifier
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  m(modifier?: string): string {
    return modifier ? _bem(this.namespace, this.block, '', '', modifier) : '';
  }

  /**
   * @description namespace-block-blockSuffix__element
   * @param {string} [blockSuffix]
   * @param {string} [element]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  be(blockSuffix?: string, element?: string): string {
    return blockSuffix && element
      ? _bem(this.namespace, this.block, blockSuffix, element, '')
      : '';
  }

  /**
   * @description namespace-block__element--modifier
   * @param {string} [element]
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  em(element?: string, modifier?: string): string {
    return element && modifier
      ? _bem(this.namespace, this.block, '', element, modifier)
      : '';
  }

  /**
   * @description namespace-block-blockSuffix--modifier
   * @param {string} [blockSuffix]
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  bm(blockSuffix?: string, modifier?: string): string {
    return blockSuffix && modifier
      ? _bem(this.namespace, this.block, blockSuffix, '', modifier)
      : '';
  }

  /**
   * @description namespace-block-blockSuffix__element--modifier
   * @param {string} [blockSuffix]
   * @param {string} [element]
   * @param {string} [modifier]
   * @returns {*}  {string}
   * @memberof Namespace
   */
  bem(blockSuffix?: string, element?: string, modifier?: string): string {
    return blockSuffix && element && modifier
      ? _bem(this.namespace, this.block, blockSuffix, element, modifier)
      : '';
  }

  /**
   * @description 返回状态类
   * @param {string} name
   * @param {boolean} [state]
   * @example
   * ```typescript
   * is('loading', false) => '';
   * is('loading', true) => 'is-loading';
   * ```
   * @returns {*}  {string}
   * @memberof Namespace
   */
  is(name: string, state?: boolean): string {
    return name && state ? `${statePrefix}${name}` : '';
  }

  /**
   * @description 生成使用到的 css 变量 style 对象
   * @param {Record<string, string>} object
   * @returns {*}  {Record<string, string>}
   * @memberof Namespace
   */
  cssVar(object: Record<string, string>): Record<string, string> {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[this.cssVarName(key)] = object[key];
      }
    }
    return styles;
  }

  /**
   * @description 生成使用到的 css block 变量 style 对象
   * @param {Record<string, string>} object
   * @returns {*}  {Record<string, string>}
   * @memberof Namespace
   */
  cssVarBlock(object: Record<string, string>): Record<string, string> {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[this.cssVarBlockName(key)] = object[key];
      }
    }
    return styles;
  }

  /**
   * @description 生成 css var 变量名称
   * @param {string} name
   * @returns {*}  {string}
   * @memberof Namespace
   */
  cssVarName(name: string): string {
    return `--${this.namespace}-${name}`;
  }

  /**
   * @description 生成块 css var 变量名称
   * @param {string} name
   * @returns {*}  {string}
   * @memberof Namespace
   */
  cssVarBlockName(name: string): string {
    return `--${this.namespace}-${this.block}-${name}`;
  }
}
