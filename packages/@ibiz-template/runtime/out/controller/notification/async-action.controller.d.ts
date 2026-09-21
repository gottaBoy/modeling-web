import { QXEvent } from 'qx-util';
import { IPortalAsyncAction } from '@ibiz-template/core';
import { AsyncActionService } from '../../service';
import { IAsyncActionController, IAsyncActionEvent } from '../../interface';
export declare class AsyncActionController implements IAsyncActionController {
    readonly evt: QXEvent<IAsyncActionEvent>;
    total: number;
    actions: IPortalAsyncAction[];
    /**
     * 正在处理中的数量
     * @author lxm
     * @date 2024-01-25 04:51:18
     * @type {number}
     */
    doingNum: number;
    /**
     * 结束的状态值集合
     * @author lxm
     * @date 2024-01-25 05:08:26
     * @protected
     */
    protected finishedStates: number[];
    /**
     * 请求服务
     * @author lxm
     * @date 2024-01-25 04:50:12
     * @protected
     */
    protected service: AsyncActionService;
    init(): Promise<void>;
    /**
     * 监听全局的实时消息
     * @author lxm
     * @date 2024-01-25 04:47:36
     */
    protected listenMessage(): void;
    /**
     * 格式化数据
     * @author lxm
     * @date 2024-01-25 05:03:47
     * @protected
     * @param {IPortalAsyncAction} data
     * @return {*}  {IPortalAsyncAction}
     */
    protected formatAsyncAction(data: IPortalAsyncAction): IPortalAsyncAction;
    /**
     * 添加一条新消息
     * @author lxm
     * @date 2024-01-25 04:58:37
     * @protected
     * @param {IPortalAsyncAction} action
     */
    protected add(action: IPortalAsyncAction): void;
    /**
     * 添加一条新消息
     * @author lxm
     * @date 2024-01-25 04:58:37
     * @protected
     * @param {IPortalAsyncAction} action
     */
    protected update(action: IPortalAsyncAction): void;
    protected noticeResult(action: IPortalAsyncAction): void;
}
//# sourceMappingURL=async-action.controller.d.ts.map