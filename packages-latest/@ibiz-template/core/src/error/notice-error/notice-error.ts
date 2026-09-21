/**
 * @description 纯输出通知信息的异常
 * @export
 * @class NoticeError
 * @extends {Error}
 */
export class NoticeError extends Error {
  name: string = 'notice Error';

  constructor(
    public message: string,
    public duration?: number,
  ) {
    super(message);
  }
}
