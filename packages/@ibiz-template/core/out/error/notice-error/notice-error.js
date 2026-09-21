/**
 * 纯输出通知信息的异常
 *
 * @author lxm
 * @date 2022-09-21 18:09:09
 * @export
 * @class NoticeError
 * @implements {Error}
 */
export class NoticeError extends Error {
    constructor(message, duration) {
        super(message);
        this.message = message;
        this.duration = duration;
        this.name = 'notice Error';
    }
}
