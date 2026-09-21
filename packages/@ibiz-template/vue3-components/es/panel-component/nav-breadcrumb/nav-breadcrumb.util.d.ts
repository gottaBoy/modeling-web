import { IAppFunc, IAppMenuItem } from '@ibiz/model-core';
import { Router } from 'vue-router';
import { BreadcrumbMsg } from './nav-breadcrumb.state';
/**
 * @description 获取首页导航信息
 * @export
 * @return {*}  {BreadcrumbMsg}
 */
export declare function getIndexBreadcrumb(context: IContext): BreadcrumbMsg;
/**
 * @description 根据视图名获取应用功能
 * @export
 * @param {string} name
 * @param {string} appid
 * @return {*}  {(IAppFunc | undefined)}
 */
export declare function getAppFuncByViewName(name: string, appid: string): IAppFunc | undefined;
/**
 * @description 根据应该功能获取菜单模型
 * @export
 * @param {IAppFunc} func
 * @param {IAppMenuItem[]} appMenuItems
 * @return {*}  {IAppMenuItem[]}
 */
export declare function getMenuItemsByAppFunc(func: IAppFunc, appMenuItems: IAppMenuItem[]): IAppMenuItem[];
/**
 * @description 获取当前视图名称
 * @export
 * @param {Router} router
 * @return {*}  {string}
 */
export declare function getCurViewName(router: Router): string;
/**
 * @description 从视图堆栈中查找视图信息
 * @export
 * @param {string} viewName
 * @return {*}  {(IData | undefined)}
 */
export declare function getViewInfoByViewStack(viewName: string): IData | undefined;
