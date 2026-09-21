import { ISysImage } from '@ibiz/model-core';
/**
 * 快捷方式数据
 *
 * @export
 * @interface IShortCutData
 */
export interface IShortCutData {
    /**
     * 唯一标识
     *
     * @type {string}
     * @memberof IShortCutData
     */
    key: string;
    /**
     * 快捷方式标题
     *
     * @type {string}
     * @memberof IShortCutData
     */
    caption: string;
    /**
     * 视图标识
     *
     * @type {string}
     * @memberof IShortCutData
     */
    appViewId: string;
    /**
     * 上下文
     *
     * @type {IContext}
     * @memberof IShortCutData
     */
    context: IContext;
    /**
     * 视图参数
     *
     * @type {IParams}
     * @memberof IShortCutData
     */
    params: IParams;
    /**
     * 打开方式
     *
     * @type {string}
     * @memberof IShortCutData
     */
    openMode: string;
    /**
     * 全路径
     *
     * @type {string}
     * @memberof IShortCutData
     */
    fullPath: string;
    /**
     * 快捷图标
     *
     * @type {string}
     * @memberof IShortCutData
     */
    icon?: ISysImage;
}
/**
 * 快捷方式
 *
 * @export
 * @interface IShortCut
 */
export interface IShortCut {
    /**
     * 快捷方式数据集合
     *
     * @type {IShortCutData[]}
     * @memberof IShortCut
     */
    items: IShortCutData[];
    /**
     * 快捷方式模式
     *
     * @type {('horizontal' | 'vertical')}
     * @memberof IShortCut
     */
    mode: 'horizontal' | 'vertical';
}
//# sourceMappingURL=i-short-cut.d.ts.map