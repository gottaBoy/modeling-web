/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppMenuItem, IAppMenuModel } from '@ibiz/model-core';
import { clone } from 'ramda';

/**
 * 递归合并主菜单项和子菜单项
 * @author lxm
 * @date 2023-12-07 03:16:13
 * @param {IAppMenuItem} mainItem
 * @param {IAppMenuItem} subItem
 */
function mergeMenuItem(
  mainItem: IAppMenuItem,
  subItem: IAppMenuItem,
  isReverse: boolean = false,
): void {
  // 主菜单项没有子菜单项直接合并替换
  if (!mainItem.appMenuItems?.length) {
    if (subItem.appMenuItems?.length) {
      // 子菜单有下级菜单的时候只是添加下级菜单
      mainItem.appMenuItems = subItem.appMenuItems;
    } else {
      // 子菜单项也没有下级菜单的时候覆盖(不应合并，场景：主菜单项隐藏，有hidden:true的数据，子菜单项显示，无hidden字段，合并还是会隐藏)
      Object.keys(mainItem).forEach((key: string) => {
        // 1.合并动态字段场景：如，accessKey，子应用有的话以子应用为准，子应用没有的话，主应用数据为准
        if (key === 'accessKey' && !subItem[key]) {
          return;
        }
        // 2. 常规场景：以子应用为准即可
        delete (mainItem as any)[key];
      });
      Object.assign(mainItem, subItem);
    }
  } else {
    const addItems: IAppMenuItem[] = [];
    subItem.appMenuItems?.forEach(item => {
      const sameMenu = mainItem.appMenuItems?.find(x => x.id === item.id);
      if (sameMenu) {
        mergeMenuItem(sameMenu, item);
      } else {
        addItems.push(item);
      }
    });
    if (isReverse) {
      mainItem.appMenuItems = addItems.concat(mainItem.appMenuItems);
    } else {
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
export function mergeSplitAppMenu(
  main: IAppMenuModel,
  sub: IAppMenuModel,
  isReverse: boolean = false,
): void {
  const addItems: IAppMenuItem[] = [];
  sub.appMenuItems?.forEach(item => {
    const sameMenu = main.appMenuItems?.find(x => x.id === item.id);
    if (sameMenu) {
      mergeMenuItem(sameMenu, item, isReverse);
    } else {
      addItems.push(item);
    }
  });

  if (!main.appMenuItems) {
    main.appMenuItems = [];
  }
  if (isReverse) {
    main.appMenuItems = addItems.concat(main.appMenuItems);
  } else {
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
export function mergeAppMenu(main: IAppMenuModel, sub: IAppMenuModel): void {
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
  } else {
    const topMainAppMenu = clone(main);
    const bottomMainAppMenu = clone(main);
    topMainAppMenu.appMenuItems =
      topMainAppMenu.appMenuItems?.slice(0, mainSplitIndex) || [];
    bottomMainAppMenu.appMenuItems =
      bottomMainAppMenu.appMenuItems?.slice(mainSplitIndex + 1) || [];
    if (subSplitIndex === -1) {
      // 主菜单有分割，子菜单无分割，添加到主菜单头部上
      mergeSplitAppMenu(topMainAppMenu, sub);
    } else {
      // 主菜单有分割，子菜单有分割，隐射添加到主菜单
      const topSubAppMenu = clone(sub);
      const bottomSubAppMenu = clone(sub);
      topSubAppMenu.appMenuItems =
        topSubAppMenu.appMenuItems?.slice(0, subSplitIndex) || [];
      bottomSubAppMenu.appMenuItems =
        bottomSubAppMenu.appMenuItems?.slice(subSplitIndex + 1) || [];
      mergeSplitAppMenu(topMainAppMenu, topSubAppMenu);
      mergeSplitAppMenu(bottomMainAppMenu, bottomSubAppMenu, true);
    }
    main.appMenuItems = topMainAppMenu.appMenuItems
      .concat(main.appMenuItems[mainSplitIndex])
      .concat(bottomMainAppMenu.appMenuItems || []);
  }
}
