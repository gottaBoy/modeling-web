import { IGridLayoutPos, ILayoutPos } from '@ibiz/model-core';
import type { GridLayoutAttrs, ScreenSize } from '../../interface';
/**
 * 计算布局高宽
 *
 * @author lxm
 * @date 2023-02-15 11:37:49
 * @export
 * @param {ILayoutPos} layoutPos
 */
export declare function calcLayoutHeightWidth(layoutPos: ILayoutPos): {
    width: string;
    height: string;
};
/**
 * 计算内容对齐的样式
 *
 * @author lxm
 * @date 2023-02-15 11:49:06
 * @export
 * @param {ILayoutPos} layoutPos
 */
export declare function calcContentAlignStyle(layoutPos: ILayoutPos): IData | undefined;
/**
 * 计算栅格布局参数
 * @author lxm
 * @date 2023-06-30 10:49:04
 * @export
 * @param {IGridLayoutPos} layoutPos
 * @return {*}  {Record<ScreenSize, GridLayoutAttrs>}
 */
export declare function calcGridLayoutPos(layoutPos: IGridLayoutPos): Record<ScreenSize, GridLayoutAttrs>;
/**
 * 计算动态样式表类名集合
 * @author lxm
 * @date 2023-08-01 04:15:48
 * @export
 * @param {string} expression 脚本
 * @param {IData} data 数据对象
 * @return {*}  {string[]}
 */
export declare function calcDynaClass(expression: string, data: IData): string[];
//# sourceMappingURL=layout.d.ts.map