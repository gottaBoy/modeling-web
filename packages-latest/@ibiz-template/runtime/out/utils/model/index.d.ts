import { IAppMenu, IControlAttribute } from '@ibiz/model-core';
/**
 * @description 计算动态菜单
 * @param {IAppMenu} menu
 */
export declare function calcDynamicMenu(menu: IAppMenu, context: IContext, params: IParams): Promise<void>;
/**
 * @description 过滤预置注入属性
 * @export
 * @param {(IControlAttribute[] | undefined)} controlAttributes
 * @returns {*}  {IControlAttribute[]}
 */
export declare function filterPresetAttrs(controlAttributes: IControlAttribute[] | undefined): IControlAttribute[];
//# sourceMappingURL=index.d.ts.map