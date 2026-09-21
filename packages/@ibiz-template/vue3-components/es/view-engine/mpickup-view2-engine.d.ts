import { ITreeExpBarController } from '@ibiz-template/runtime';
import { MPickupViewEngine } from './mpickup-view-engine';
/**
 * 多数据选择视图（左右关系）引擎
 *
 * @author zk
 * @date 2023-05-25 03:05:17
 * @export
 * @class MPickupViewEngine
 * @extends {ViewEngineBase}
 */
export declare class MPickupView2Engine extends MPickupViewEngine {
    /**
     * 树导航栏
     *
     * @readonly
     * @memberof TreeExpViewEngine
     */
    get treeExpBar(): ITreeExpBarController;
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof PickupView2Engine
     */
    onCreated(): Promise<void>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof PickupView2Engine
     */
    onMounted(): Promise<void>;
}
