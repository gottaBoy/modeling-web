import { DSLHelper } from '@ibiz/rt-model-api';
import { mergeAppMenu } from './merge-app-menu';
import { mergeDEDrControl } from './merge-de-drcontrol';
import { mergeAppDEUIActionGroup } from './merge-app-uiaction-group';
import { mergeTreeView } from './merge-treeview';
/**
 * 子应用模型合并对象
 *
 * @author tony001
 * @date 2024-09-26 16:09:56
 * @export
 * @class MergeSubModelHelper
 */
export class MergeSubModelHelper {
    constructor() {
        /**
         * dsl解析包
         *
         * @author tony001
         * @date 2024-09-26 16:09:48
         * @protected
         */
        this.dsl = new DSLHelper();
    }
    /**
     * 合并应用主菜单
     *
     * @author tony001
     * @date 2024-09-26 16:09:03
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeAppMainMenu(view, controls, subAppRefs) {
        const dstAppMenu = controls === null || controls === void 0 ? void 0 : controls.find(item => {
            return item.controlType === 'APPMENU' && item.name === 'appmenu';
        });
        if (dstAppMenu) {
            for (let i = 0; i < subAppRefs.length; i++) {
                const srcAppMenu = subAppRefs[i].appMenuModel;
                if (srcAppMenu) {
                    mergeAppMenu(dstAppMenu, srcAppMenu);
                }
            }
        }
    }
    /**
     * 合并扩展菜单
     *
     * @author tony001
     * @date 2024-09-26 16:09:27
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     * @return {*}  {void}
     */
    mergeSubAppExtendedMenu(view, controls, subAppRefs) {
        if (view.viewType !== 'APPINDEXVIEW' || !controls)
            return;
        const dstAppMenus = controls.filter(item => {
            return item.controlType === 'APPMENU' && item.name !== 'appmenu';
        });
        if (dstAppMenus && dstAppMenus.length > 0) {
            for (let i = 0; i < dstAppMenus.length; i++) {
                const dstAppMenu = dstAppMenus[i];
                if (dstAppMenu && dstAppMenu.name) {
                    for (let j = 0; j < subAppRefs.length; j++) {
                        const srcAppMenu = ibiz.hub.getSubAppMenuModel(dstAppMenu.name, subAppRefs[j].appId);
                        if (srcAppMenu) {
                            mergeAppMenu(dstAppMenu, srcAppMenu);
                        }
                    }
                }
            }
        }
    }
    /**
     * 合并DRCtrl
     *
     * @author tony001
     * @date 2024-09-26 16:09:01
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppDRCtrl(view, controls, subAppRefs) {
        const dstDRCtrl = controls === null || controls === void 0 ? void 0 : controls.find(item => {
            return item.controlType === 'DRBAR' || item.controlType === 'DRTAB';
        });
        if (dstDRCtrl) {
            for (let i = 0; i < subAppRefs.length; i++) {
                const srcDRCtrl = ibiz.hub.getSubAppDrControl(`${dstDRCtrl.appDataEntityId.split('.')[1]}_${dstDRCtrl.modelType}_${dstDRCtrl.dataRelationTag}`.toLowerCase(), subAppRefs[i].appId);
                if (srcDRCtrl) {
                    mergeDEDrControl(dstDRCtrl, srcDRCtrl);
                }
            }
        }
    }
    /**
     * 合并工具栏界面行为组项
     *
     * @author tony001
     * @date 2024-09-26 16:09:23
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppToolbarActionGroup(view, controls, subAppRefs) {
        if (!controls)
            return;
        const dstToolBar = controls.find(item => {
            return item.controlType === 'TOOLBAR';
        });
        if (dstToolBar && dstToolBar.detoolbarItems) {
            const dstToolBarItems = dstToolBar.detoolbarItems;
            if (dstToolBarItems && dstToolBarItems.length > 0) {
                for (let i = 0; i < dstToolBarItems.length; i++) {
                    const dstToolBarItem = dstToolBarItems[i];
                    if (dstToolBarItem &&
                        dstToolBarItem.uiactionGroup) {
                        const dstUIActionGroup = dstToolBarItem
                            .uiactionGroup;
                        if (dstUIActionGroup) {
                            for (let j = 0; j < subAppRefs.length; j++) {
                                if (subAppRefs[j].appId === view.appId) {
                                    continue;
                                }
                                const srcAppDEUIActionGroup = ibiz.hub.getSubAppDEUIActionGroups(dstUIActionGroup.uniqueTag, subAppRefs[j].appId);
                                if (srcAppDEUIActionGroup) {
                                    mergeAppDEUIActionGroup(dstToolBarItems[i].uiactionGroup, srcAppDEUIActionGroup);
                                }
                            }
                        }
                    }
                }
            }
        }
        controls.forEach(control => {
            if (control && control.controls) {
                this.mergeSubAppToolbarActionGroup(view, control.controls, subAppRefs);
            }
        });
    }
    /**
     * 合并树上下文菜单
     *
     * @author tony001
     * @date 2024-09-26 16:09:02
     * @param {IAppView} view
     * @param {(IControl[] | undefined)} controls
     * @param {ISubAppRef[]} subAppRefs
     */
    mergeSubAppTreeContextMenuActionGroup(view, controls, subAppRefs) {
        var _a, _b;
        if (!controls)
            return;
        const dstTree = controls.find(item => {
            return item.controlType === 'TREEVIEW';
        });
        if (dstTree && dstTree.controls && dstTree.controls.length > 0) {
            const dstContextMenus = (_a = dstTree.controls) === null || _a === void 0 ? void 0 : _a.filter(item => {
                return item.controlType === 'CONTEXTMENU';
            });
            if (dstContextMenus && dstContextMenus.length > 0) {
                for (let k = 0; k < dstContextMenus.length; k++) {
                    const dstContextMenu = dstContextMenus[k];
                    if (dstContextMenu && dstContextMenu.detoolbarItems) {
                        const dstContextMenuItems = dstContextMenu
                            .detoolbarItems;
                        if (dstContextMenuItems && dstContextMenuItems.length > 0) {
                            for (let i = 0; i < dstContextMenuItems.length; i++) {
                                const dstContextMenuItem = dstContextMenuItems[i];
                                if (dstContextMenuItem &&
                                    dstContextMenuItem.uiactionGroup) {
                                    const dstUIActionGroup = dstContextMenuItem.uiactionGroup;
                                    if (dstUIActionGroup) {
                                        for (let j = 0; j < subAppRefs.length; j++) {
                                            const srcAppDEUIActionGroup = ibiz.hub.getSubAppDEUIActionGroups(dstUIActionGroup.uniqueTag, subAppRefs[j].appId);
                                            if (srcAppDEUIActionGroup) {
                                                mergeAppDEUIActionGroup(dstContextMenuItems[i]
                                                    .uiactionGroup, srcAppDEUIActionGroup);
                                                const targetDeTreeNode = (_b = dstTree.detreeNodes) === null || _b === void 0 ? void 0 : _b.find(treeNode => {
                                                    return (treeNode.decontextMenu &&
                                                        treeNode.decontextMenu.modelId ===
                                                            dstContextMenu.modelId);
                                                });
                                                if (targetDeTreeNode) {
                                                    targetDeTreeNode.decontextMenu = dstContextMenu;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        controls.forEach(control => {
            if (control && control.controls) {
                this.mergeSubAppTreeContextMenuActionGroup(view, control.controls, subAppRefs);
            }
        });
    }
    mergeSubAppTreeView(view, controls, subAppRefs) {
        if (!controls)
            return;
        const dstTree = controls.find(item => {
            return item.controlType === 'TREEVIEW';
        });
        if (dstTree) {
            const ids = dstTree.id.split('.');
            for (let i = 0; i < subAppRefs.length; i++) {
                const srcTree = ibiz.hub.getSubAppControl(ids[1] + ids[2], subAppRefs[i].appId);
                if (srcTree) {
                    mergeTreeView(dstTree, srcTree);
                }
            }
        }
        controls.forEach(control => {
            if (control && control.controls) {
                this.mergeSubAppTreeView(view, control.controls, subAppRefs);
            }
        });
    }
}
