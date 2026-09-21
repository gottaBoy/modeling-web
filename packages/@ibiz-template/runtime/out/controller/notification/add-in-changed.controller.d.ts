import { IPortalMessage } from '@ibiz-template/core';
import { IAddInChangedController } from '../../interface';
/**
 * 添加变更消息控制器
 *
 * @export
 * @class AddInChangedController
 * @implements {IAddInChangedController}
 */
export declare class AddInChangedController implements IAddInChangedController {
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof AddInChangedController
     */
    init(): Promise<void>;
    /**
     * 显示添加变更消息
     *
     * @author tony001
     * @date 2025-01-10 10:01:12
     * @param {IPortalMessage} msg
     * @return {*}  {Promise<void>}
     */
    showAddInChanged(msg: IPortalMessage): Promise<void>;
    /**
     * 监听Mqtt消息
     *
     * @protected
     * @memberof AddInChangedController
     */
    protected listenMqtt(): void;
}
//# sourceMappingURL=add-in-changed.controller.d.ts.map