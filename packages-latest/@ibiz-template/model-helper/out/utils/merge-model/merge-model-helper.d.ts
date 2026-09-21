import { IAppCodeList, IAppDEACMode, IAppView, IControl, IDEToolbarItem, ISubAppRef } from '@ibiz/model-core';
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
     * @description 递归合并工具项界面行为组
     * @param {IDEToolbarItem[]} dstToolBarItems
     * @param {IAppView} view
     * @param {ISubAppRef[]} subAppRefs
     * @memberof MergeSubModelHelper
     */
    recursiveMergeSubAppToolbarItemActionGroup(dstToolBarItems: IDEToolbarItem[], view: IAppView, subAppRefs: ISubAppRef[]): void;
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
    /**
     * 合并表单行为组（按钮组）
     *
     * @author tony001
     * @date 2025-02-10 21:02:47
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppFormActionGroup(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * 合并表格列行为组
     *
     * @author tony001
     * @date 2025-02-11 18:02:21
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppGridCloumnActionGroup(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * @description 合并子应用表单(实体代码标识和表单代码标识一致)
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     * @memberof MergeSubModelHelper
     */
    mergeSubAppForm(view: IAppView, controls: IControl[] | undefined, subAppRefs: ISubAppRef[]): void;
    /**
     * @description 合并子应用代码表(子应用代码表标识和主应用代码表标识一致，包含模块、代码表代码名称2部分内容保持一致)
     * @param codelist
     * @param subAppRefs
     */
    mergeSubAppCodeList(codelist: IAppCodeList, subAppRefs: ISubAppRef[]): void;
    /**
     * @description 合并子应用AC自填模式界面行为组
     * @param {(IAppDEACMode[] | undefined)} acModes
     * @param {ISubAppRef[]} subAppRefs
     * @returns {*}  {void}
     * @memberof MergeSubModelHelper
     */
    mergeSubAppDEACModesActionGroup(acModes: IAppDEACMode[] | undefined, subAppRefs: ISubAppRef[]): void;
}
//# sourceMappingURL=merge-model-helper.d.ts.map