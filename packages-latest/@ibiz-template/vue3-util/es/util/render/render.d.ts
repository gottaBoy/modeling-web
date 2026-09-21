import { ControlController } from '@ibiz-template/runtime';
/**
 * 把未知格式的值绘制成字符串
 * - 空值输出空字符串
 * - 对象，数组输出成JSON字符串
 * - 其他类型转成字符串输出
 * @author lxm
 * @date 2023-10-09 02:29:13
 * @export
 * @param {unknown} value
 * @return {*}  {string}
 */
export declare function renderString(value: unknown): string;
/**
 * 检查部件绘制器集合是否具有无数据绘制器
 * @author ljx
 * @date 2024-01-17 18:51:23
 * @export
 * @param {ControlController} c 部件控制器
 * @return {*} 返回一个布尔值，表示是否具有无数据绘制器
 */
export declare const hasEmptyPanelRenderer: (c: ControlController) => boolean;
//# sourceMappingURL=render.d.ts.map