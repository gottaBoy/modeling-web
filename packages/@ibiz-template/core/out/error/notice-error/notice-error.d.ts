/**
 * 纯输出通知信息的异常
 *
 * @author lxm
 * @date 2022-09-21 18:09:09
 * @export
 * @class NoticeError
 * @implements {Error}
 */
export declare class NoticeError extends Error {
    message: string;
    duration?: number | undefined;
    name: string;
    constructor(message: string, duration?: number | undefined);
}
//# sourceMappingURL=notice-error.d.ts.map