/**
 * @description 纯输出通知信息的异常
 * @export
 * @class NoticeError
 * @extends {Error}
 */
export class NoticeError extends Error {
    constructor(message, duration) {
        super(message);
        this.message = message;
        this.duration = duration;
        this.name = 'notice Error';
    }
}
