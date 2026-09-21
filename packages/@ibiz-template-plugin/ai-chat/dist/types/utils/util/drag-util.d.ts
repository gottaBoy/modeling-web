/**
 * 检查是否在窗口内部
 *
 * @export
 * @param {{ x: number; y: number }} data
 * @return {*}  {boolean}
 */
export declare function isWithinBounds(data: {
    x: number;
    y: number;
}): boolean;
/**
 * 拖拽限制（不能超出窗口）
 *
 * @export
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @return {*}  {{
 *   x: number;
 *   y: number;
 * }}
 */
export declare function limitDraggable(left: number, top: number, width: number, height: number): {
    x: number;
    y: number;
};
