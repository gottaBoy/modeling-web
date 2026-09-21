import { Namespace } from '@ibiz-template/core';
import { IExpBarControlController } from '@ibiz-template/runtime';
import { VNode } from 'vue';
import './render-util.scss';
/**
 * 导航栏绘制工具（标题，快速搜索）
 * @author lxm
 * @date 2023-08-02 08:06:38
 * @export
 * @param {ExpBarControlController} c
 * @param {Namespace} ns
 * @return {*}  {({ renderTitle: () => VNode | null; renderSearchBar: () => VNode | null })}
 */
export declare function useExpBarRender(c: IExpBarControlController, ns: Namespace): {
    renderTitle: () => VNode | null;
    renderSearchBar: () => VNode | null;
};
/**
 * 监听路由变更，当自身所处的路由变更时触发导航栏控制器onRouterChange
 * @author lxm
 * @date 2023-09-14 10:02:41
 * @export
 * @param {IExpBarControlController} c
 */
export declare function useWatchRouteChange(c: IExpBarControlController): void;
