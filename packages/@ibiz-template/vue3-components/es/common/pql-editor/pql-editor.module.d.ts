import { IDomEditor, IModuleConf, SlateElement } from '@wangeditor/editor';
import { VNode } from 'snabbdom';
/**
 * PQL插件
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:39
 * @export
 * @template T
 * @param {T} editor
 * @return {*}
 */
export declare function withPqlPlugin<T extends IDomEditor>(editor: T): T;
/**
 * 渲染PQL元素
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:14
 * @export
 * @param {IData} el
 * @return {*}  {VNode}
 */
export declare function renderPqlElement(el: IData): VNode;
/**
 * 转换PQL元素为html
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:38
 * @param {IData} el
 * @return {*}  {string}
 */
export declare function pqlToHtml(el: IData): string;
/**
 * 转换html为PQL元素
 *
 * @author zhanghengfeng
 * @date 2024-06-28 20:06:32
 * @export
 * @param {Element} domElem
 * @return {*}  {SlateElement}
 */
export declare function parsePqlHtml(domElem: Element): SlateElement;
/**
 * PQL模块
 *
 */
export declare const PqlModule: Partial<IModuleConf>;
