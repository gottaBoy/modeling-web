/**
 * 通过回车聚焦元素
 *
 * @export
 * @param {(HTMLElement | Document)} [target=document] 聚焦元素范围 默认document
 * @param {string[]} [querySelects=[
 *     'a',
 *     'input',
 *     'button',
 *     'textarea',
 *     'select',
 *     '[tabindex]:not([tabindex="-1"])',
 *   ]] 可聚焦元素选择器
 * @param {() => void} [callback] 最后一个可聚焦元素回车事件回调
 * @return {*}  {{
 *   cleanup: () => void;
 * }}
 */
export declare function useFocusByEnter(target?: HTMLElement | Document, querySelects?: string[], callback?: () => void): {
    cleanup: () => void;
};
