import { IErrorHandler } from '../../interface';
/**
 * 默认处理器
 * @author lxm
 * @date 2023-09-26 04:52:18
 * @export
 * @class DefaultErrorHandler
 * @implements {IErrorHandler}
 */
export declare class DefaultErrorHandler implements IErrorHandler {
    /**
     * 错误去重时间间隔（300ms）
     */
    static DEDUP_INTERVAL: number;
    /**
     * 错误缓存
     */
    static errorCache: Map<string, number>;
    /**
     * 判断错误是否重复
     */
    static isDuplicate(message: string): boolean;
    /**
     * 处理错误
     */
    handle(error: unknown): boolean | undefined;
}
//# sourceMappingURL=default-error-handler.d.ts.map