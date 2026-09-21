/**
 * 错误处理器接口
 * @author lxm
 * @date 2023-09-26 04:51:18
 * @export
 * @interface IErrorHandler
 */
export interface IErrorHandler {
    /**
     * 处理错误,如果处理了该异常则返回true,后续处理器的就不会处理该异常
     * @author lxm
     * @date 2023-09-26 04:48:57
     * @param {unknown} error
     */
    handle(error: unknown): boolean | undefined;
}
//# sourceMappingURL=i-error-handler.d.ts.map