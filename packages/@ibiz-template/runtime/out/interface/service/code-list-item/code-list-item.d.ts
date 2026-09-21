import { ISysImage } from '@ibiz/model-core';
/**
 * 返回的代码项格式
 *
 * @author lxm
 * @date 2022-08-26 15:08:49
 * @export
 * @interface CodeListItem
 */
export interface CodeListItem {
    /**
     * 值
     * @type {string}
     */
    value: string | number;
    /**
     * 文本
     * @type {string}
     */
    text: string;
    /**
     * 代码标识
     * @type {string}
     */
    id: string;
    /**
     * 颜色
     * @type {string}
     */
    color?: string;
    /**
     * 背景颜色
     * @type {string}
     */
    bkcolor?: string;
    /**
     * 子代码项
     * @type {CodeListItem[]}
     */
    children?: CodeListItem[];
    /**
     * 文本样式
     * @type {string}
     */
    textCls?: string;
    /**
     * 样式表名称
     * @type {string}
     */
    cls?: string;
    /**
     * 禁止选择
     * @author lxm
     * @date 2023-10-08 03:49:40
     * @type {boolean}
     */
    disableSelect?: boolean;
    /**
     * 图标对象
     * @type {ISysImage}
     */
    sysImage?: ISysImage;
    /**
     * 代码项数据
     * @type {String}
     */
    data?: IData;
    /**
     * 提示信息
     * @type {String}
     */
    tooltip?: string;
    /**
     * 代码表标记
     *
     * @author zhanghengfeng
     * @date 2024-02-19 16:02:26
     * @type {string}
     */
    userData?: string;
    /**
     * 阈值起始值
     *
     * @type {number}
     * @memberof CodeListItem
     */
    beginValue?: number;
    /**
     * 阈值结束值
     *
     * @type {number}
     * @memberof CodeListItem
     */
    endValue?: number;
    /**
     * 包含阈值起始值
     *
     * @type {boolean}
     * @memberof CodeListItem
     */
    includeBeginValue?: boolean;
    /**
     * 包含阈值结束值
     *
     * @type {boolean}
     * @memberof CodeListItem
     */
    includeEndValue?: boolean;
}
//# sourceMappingURL=code-list-item.d.ts.map