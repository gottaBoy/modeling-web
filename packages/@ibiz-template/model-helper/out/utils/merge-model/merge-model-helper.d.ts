import { IAppView, IControl, ISubAppRef } from '@ibiz/model-core';
import { DSLHelper } from '@ibiz/rt-model-api';
/**
 * 子应用模型合并对象
 *
 * @author tony001
 * @date 2024-09-26 16:09:56
 * @export
 * @class MergeSubModelHelper
 */
export declare class MergeSubModelHelper {
    /**
     * dsl解析包
     *
     * @author tony001
     * @date 2024-09-26 16:09:48
     * @protected
     */
    protected dsl: DSLHelper;
    /**
     * 合并应用主菜单
     *
     * @author tony001
     * @date 2024-09-26 16:09:03
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeAppMainMenu(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * 合并扩展菜单
     *
     * @author tony001
     * @date 2024-09-26 16:09:27
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     * @return {*}  {void}
     */
    mergeSubAppExtendedMenu(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * 合并DRCtrl
     *
     * @author tony001
     * @date 2024-09-26 16:09:01
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppDRCtrl(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * 合并工具栏界面行为组项
     *
     * @author tony001
     * @date 2024-09-26 16:09:23
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppToolbarActionGroup(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * 合并树上下文菜单
     *
     * @author tony001
     * @date 2024-09-26 16:09:02
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppTreeContextMenuActionGroup(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    mergeSubAppTreeView(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
}
//# sourceMappingURL=merge-model-helper.d.ts.map