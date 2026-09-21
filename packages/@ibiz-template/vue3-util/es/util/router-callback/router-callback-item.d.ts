import { IModalData } from '@ibiz-template/runtime';
/**
 * 路由视图关闭回调
 *
 * @author chitanda
 * @date 2023-07-13 21:07:51
 * @export
 * @class RouterCallbackItem
 */
export declare class RouterCallbackItem {
    from: string;
    to: string;
    protected resolve?: (modal: IModalData) => void;
    protected promise?: Promise<IModalData>;
    /**
     * 销毁定时器
     *
     * @author chitanda
     * @date 2023-07-13 21:07:51
     * @type {number}
     */
    timeout?: number;
    /**
     * 是否已经有打开的视图认领此回调，如果在一定时间内没有被认领，则会被清除
     *
     * @author chitanda
     * @date 2023-07-13 21:07:35
     */
    isActivated: boolean;
    constructor(from: string, to: string);
    /**
     * 等待视图关闭
     *
     * @author chitanda
     * @date 2023-07-13 21:07:34
     * @return {*}  {Promise<IModalData>}
     */
    onWillDismiss(): Promise<IModalData>;
    /**
     * 关闭视图
     *
     * @author chitanda
     * @date 2023-07-13 21:07:06
     * @param {IModalData} modal
     */
    close(modal: IModalData): void;
    /**
     * 激活回调
     *
     * @author chitanda
     * @date 2023-07-13 21:07:29
     */
    active(): void;
    /**
     * 销毁回调
     *
     * @author chitanda
     * @date 2023-07-13 21:07:21
     */
    destroy(): void;
}
//# sourceMappingURL=router-callback-item.d.ts.map