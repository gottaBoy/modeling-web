/**
 * @description 纯输出通知信息的异常
 * @export
 * @class NoticeError
 * @extends {Error}
 */
export declare class NoticeError extends Error {
    message: string;
    duration?: number | undefined;
    name: string;
    constructor(message: string, duration?: number | undefined);
}
//# sourceMappingURL=notice-error.d.ts.map