import { IErrorHandler } from '../../interface';
/**
 * 事件处理工具
 *
 * @author lxm
 * @date 2022-09-21 18:09:31
 * @export
 * @class ErrorHandler
 */
export declare class ErrorHandlerCenter {
    /**
     * 处理器集合
     * @author lxm
     * @date 2023-09-26 04:56:29
     * @type {IErrorHandler[]}
     */
    protected handlers: IErrorHandler[];
    /**
     * 注册处理器（后注册的优先级更高）
     * @author lxm
     * @date 2023-09-26 04:59:06
     * @param {IErrorHandler} handler
     */
    register(handler: IErrorHandler): void;
    /**
     * 处理单个报错
     * @author lxm
     * @date 2023-09-26 05:18:18
     * @protected
     * @param {unknown} error
     */
    protected handleSingle(error: unknown): void;
    /**
     * 按顺序检测处理器，最先满足条件的处理该异常
     * @author lxm
     * @date 2023-09-26 05:01:08
     * @param {unknown} error
     */
    handle(error: unknown): void;
}
//# sourceMappingURL=error-handler-center.d.ts.map