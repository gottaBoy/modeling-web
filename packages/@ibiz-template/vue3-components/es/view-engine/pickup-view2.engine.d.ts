import { ITreeExpBarController } from '@ibiz-template/runtime';
import { PickupViewEngine } from './pickup-view.engine';
export declare class PickupView2Engine extends PickupViewEngine {
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
