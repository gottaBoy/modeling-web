import { IApiData } from '@ibiz-template/core';
/**
 * @description 布局子成员的通用UI属性
 * @export
 * @interface IApiLayoutState
 */
export interface IApiLayoutState {
    /**
     * @description 布局宽度
     * @type {string}
     * @memberof IApiLayoutState
     */
    width: string;
    /**
     * @description 布局高度
     * @type {string}
     * @memberof IApiLayoutState
     */
    height: string;
    /**
     * @description 额外样式，对象格式
     * @type {IApiData}
     * @memberof IApiLayoutState
     */
    extraStyle: IApiData;
    /**
     * @description 额外类名
     * @type {string[]}
     * @memberof IApiLayoutState
     */
    extraClass: string[];
    /**
     * @description 压制自身内容的样式
     * @type {IApiData}
     * @memberof IApiLayoutState
     */
    contentStyle: IApiData;
}
/**
 * @primary
 * @description 界面布局需要用到的成员通用状态
 * @export
 * @interface IApiColState
 */
export interface IApiColState {
    /**
     * @description 是否显示
     * @type {boolean}
     * @memberof IApiColState
     */
    visible: boolean;
    /**
     * @description 隐藏时保留状态，再次显示时恢复原样（不重新初始化）
     * @type {boolean}
     * @memberof IApiColState
     */
    keepAlive: boolean;
    /**
     * @description 布局面板状态
     * @type {IApiLayoutState}
     * @memberof IApiColState
     */
    layout: IApiLayoutState;
}
//# sourceMappingURL=i-api-col-state.d.ts.map