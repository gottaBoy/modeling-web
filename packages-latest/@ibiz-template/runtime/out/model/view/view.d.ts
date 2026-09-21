import { IAppView, IAppViewEngine, IAppViewLogic, IControl } from '@ibiz/model-core';
/**
 * 通过视图模型获取里面的部件模型集合
 * @author lxm
 * @date 2023-07-17 11:36:18
 * @export
 * @param {IAppView} view
 * @return {*}  {IControl[]}
 */
export declare function getControlsByView(view: IAppView): IControl[];
/**
 * 通过视图模型获取视图逻辑集合
 * @author lxm
 * @date 2023-07-17 11:37:37
 * @export
 * @param {IAppView} view
 * @return {*}  {IAppViewLogic[]}
 */
export declare function getViewLogics(view: IAppView): IAppViewLogic[];
/**
 * 通过视图模型获取视图引擎集合
 * @author lxm
 * @date 2023-07-17 11:37:37
 * @export
 * @param {IAppView} view
 * @return {*}  {IAppViewEngine[]}
 */
export declare function getViewEngines(view: IAppView): IAppViewEngine[];
/**
 * @description 获取部件引擎
 * @export
 * @param {IAppView} view
 * @returns {*}  {IAppViewEngine[]}
 */
export declare function getCtrlEngines(view: IAppView): IAppViewEngine[];
//# sourceMappingURL=view.d.ts.map