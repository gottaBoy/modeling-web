import { clone } from 'ramda';
/**
 * 递归合并主菜单项和子菜单项
 * @author lxm
 * @date 2023-12-07 03:16:13
 * @param {IAppMenuItem} mainItem
 * @param {IAppMenuItem} subItem
 */
function mergeMenuItem(mainItem, subItem, isReverse = false) {
    var _a, _b, _c;
    // 主菜单项没有子菜单项直接合并替换
    if (!((_a = mainItem.appMenuItems) === null || _a === void 0 ? void 0 : _a.length)) {
        if ((_b = subItem.appMenuItems) === null || _b === void 0 ? void 0 : _b.length) {
            // 子菜单有下级菜单的时候只是添加下级菜单
            mainItem.appMenuItems = subItem.appMenuItems;
        }
        else {
            // 子菜单项也没有下级菜单的时候覆盖
            Object.assign(mainItem, subItem);
        }
    }
    else {
        const addItems = [];
        (_c = subItem.appMenuItems) === null || _c === void 0 ? void 0 : _c.forEach(item => {
            var _a;
            const sameMenu = (_a = mainItem.appMenuItems) === null || _a === void 0 ? void 0 : _a.find(x => x.id === item.id);
            if (sameMenu) {
                mergeMenuItem(sameMenu, item);
            }
            else {
                addItems.push(item);
            }
        });
        if (isReverse) {
            mainItem.appMenuItems = addItems.concat(mainItem.appMenuItems);
        }
        else {
            mainItem.appMenuItems.push(...addItems);
        }
    }
}
/**
 * 合并切分菜单
 *
 * @author tony001
 * @date 2024-09-26 18:09:31
 * @export
 * @param {IAppMenuModel} main
 * @param {IAppMenuModel} sub
 */
export function mergeSplitAppMenu(main, sub, isReverse = false) {
    var _a;
    const addItems = [];
    (_a = sub.appMenuItems) === null || _a === void 0 ? void 0 : _a.forEach(item => {
        var _a;
        const sameMenu = (_a = main.appMenuItems) === null || _a === void 0 ? void 0 : _a.find(x => x.id === item.id);
        if (sameMenu) {
            mergeMenuItem(sameMenu, item, isReverse);
        }
        else {
            addItems.push(item);
        }
    });
    if (!main.appMenuItems) {
        main.appMenuItems = [];
    }
    if (isReverse) {
        main.appMenuItems = addItems.concat(main.appMenuItems);
    }
    else {
        main.appMenuItems.push(...addItems);
    }
}
/**
 * 合并主菜单和子菜单
 * @author lxm
 * @date 2023-12-07 03:15:54
 * @param {IAppMenuModel} main
 * @param {IAppMenuModel} sub
 */
export function mergeAppMenu(main, sub) {
    var _a, _b, _c, _d;
    if (!main.appMenuItems) {
        main.appMenuItems = [];
    }
    if (!sub.appMenuItems) {
        sub.appMenuItems = [];
    }
    // 主菜单分割下标
    const mainSplitIndex = main.appMenuItems.findIndex(item => {
        return item.itemType === 'SEPERATOR' && item.spanMode;
    });
    // 子菜单分割下标
    const subSplitIndex = sub.appMenuItems.findIndex(item => {
        return item.itemType === 'SEPERATOR' && item.spanMode;
    });
    // 主菜单无分割，子菜单有or无分割，全整添加到主菜单
    if (mainSplitIndex === -1) {
        mergeSplitAppMenu(main, sub);
    }
    else {
        const topMainAppMenu = clone(main);
        const bottomMainAppMenu = clone(main);
        topMainAppMenu.appMenuItems =
            ((_a = topMainAppMenu.appMenuItems) === null || _a === void 0 ? void 0 : _a.slice(0, mainSplitIndex)) || [];
        bottomMainAppMenu.appMenuItems =
            ((_b = bottomMainAppMenu.appMenuItems) === null || _b === void 0 ? void 0 : _b.slice(mainSplitIndex + 1)) || [];
        if (subSplitIndex === -1) {
            // 主菜单有分割，子菜单无分割，添加到主菜单头部上
            mergeSplitAppMenu(topMainAppMenu, sub);
        }
        else {
            // 主菜单有分割，子菜单有分割，隐射添加到主菜单
            const topSubAppMenu = clone(sub);
            const bottomSubAppMenu = clone(sub);
            topSubAppMenu.appMenuItems =
                ((_c = topSubAppMenu.appMenuItems) === null || _c === void 0 ? void 0 : _c.slice(0, subSplitIndex)) || [];
            bottomSubAppMenu.appMenuItems =
                ((_d = bottomSubAppMenu.appMenuItems) === null || _d === void 0 ? void 0 : _d.slice(subSplitIndex + 1)) || [];
            mergeSplitAppMenu(topMainAppMenu, topSubAppMenu);
            mergeSplitAppMenu(bottomMainAppMenu, bottomSubAppMenu, true);
        }
        main.appMenuItems = topMainAppMenu.appMenuItems
            .concat(main.appMenuItems[mainSplitIndex])
            .concat(bottomMainAppMenu.appMenuItems || []);
    }
}
