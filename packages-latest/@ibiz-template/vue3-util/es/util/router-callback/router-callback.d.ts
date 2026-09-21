import { IModalData } from '@ibiz-template/runtime';
import { Router } from 'vue-router';
import { RouterCallbackItem } from './router-callback-item';
/**
 * 路由打开视图回调，连通上级视图的关闭
 *
 * @author chitanda
 * @date 2023-07-13 20:07:20
 * @export
 * @class RouterCallback
 */
export declare class RouterCallback {
    /**
     * 回调实例
     *
     * @author chitanda
     * @date 2023-07-13 20:07:12
     * @protected
     * @type {Map<string, RouterCallbackItem>}
     */
    protected map: Map<string, RouterCallbackItem>;
    /**
     * 打开视图
     *
     * @author chitanda
     * @date 2023-07-13 20:07:13
     * @param {Router} router
     * @param {string} path
     * @return {*}  {Promise<IModalData>}
     */
    open(router: Router, path: string, modalOptions?: IData): Promise<IModalData>;
    /**
     * 关闭视图回调
     *
     * @author chitanda
     * @date 2023-07-13 20:07:38
     * @param {string} toFullPath
     * @param {IModalData} modal
     */
    close(toFullPath: string, modal: IModalData): void;
    /**
     * 激活回调
     *
     * @author chitanda
     * @date 2023-07-13 21:07:03
     * @param {string} toFullPath
     */
    active(toFullPath: string): void;
    /**
     * 十分钟内未激活的视图回调会被清除
     *
     * @author chitanda
     * @date 2023-07-13 21:07:57
     * @protected
     * @param {RouterCallbackItem} item
     */
    protected scheduledDestruction(item: RouterCallbackItem): void;
}
export declare const routerCallback: RouterCallback;
//# sourceMappingURL=router-callback.d.ts.map