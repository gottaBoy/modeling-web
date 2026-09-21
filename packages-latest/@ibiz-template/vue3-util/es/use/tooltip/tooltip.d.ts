import { IControlItem } from '@ibiz/model-core';
import { type VNode } from 'vue';
import { IControlController } from '@ibiz-template/runtime';
/**
 * @description 位置
 * @export
 * @enum {string}
 */
export declare enum TooltipPlacement {
    TOP = "top",
    TOP_START = "top-start",
    TOP_END = "top-end",
    BOTTOM = "bottom",
    BOTTOM_START = "bottom-start",
    BOTTOM_END = "bottom-end",
    LEFT = "left",
    LEFT_START = "left-start",
    LEFT_END = "left-end",
    RIGHT = "right",
    RIGHT_START = "right-start",
    RIGHT_END = "right-end"
}
/**
 * @description 触发方式
 * @export
 * @enum {string}
 */
export declare enum TooltipTrigger {
    HOVER = "hover",
    CLICK = "click",
    FOCUS = "focus",
    CONTEXTMENU = "contextmenu"
}
export type TooltipContent = string | VNode | (() => VNode);
/**
 * @description tooltip配置
 * @export
 * @interface TooltipOptions
 */
export interface TooltipOptions {
    /**
     * @description 内容
     * @type {TooltipContent}
     * @memberof TooltipOptions
     */
    content: TooltipContent;
    /**
     * @description 位置
     * @default 'top'
     * @type {TooltipPlacement}
     * @memberof TooltipOptions
     */
    placement?: TooltipPlacement;
    /**
     * @description 触发方式
     * @default 'hover'
     * @type {TooltipTrigger}
     * @memberof TooltipOptions
     */
    trigger?: TooltipTrigger;
    /**
     * @description 出现位置的偏移量
     * @type {number}
     * @memberof TooltipOptions
     */
    offset?: number;
    /**
     * @description 为 Tooltip 的 popper 添加类名
     * @type {string}
     * @memberof TooltipOptions
     */
    popperClass?: string;
    /**
     * @description 为 Tooltip 的 popper 添加自定义样式
     * @type {string}
     * @memberof TooltipOptions
     */
    popperStyle?: string;
    /**
     * @description 是否有箭头
     * @default true
     * @type {boolean}
     * @memberof TooltipOptions
     */
    showArrow?: boolean;
    /**
     * @description 禁用
     * @type {boolean}
     * @memberof TooltipOptions
     */
    disabled?: boolean;
}
/**
 * @description 绘制tooltip
 * @export
 * @param {IData} data 数据
 * @param {IControlItem} model 部件项模型
 * @param {IControlController} ctrl 部件控制器
 * @param {string} [tooltipId = `${model.id?.toLowerCase()}_tooltip`] tooltip标识[默认部件项模型标识]
 * @returns {*}  {TooltipOptions}
 */
export declare function renderTooltip(data: IData, model: IControlItem, ctrl: IControlController, tooltipId?: string): TooltipOptions;
//# sourceMappingURL=tooltip.d.ts.map