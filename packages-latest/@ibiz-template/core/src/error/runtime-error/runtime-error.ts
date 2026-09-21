/**
 * @description 运行时错误
 * @export
 * @class RuntimeError
 * @extends {Error}
 */
export class RuntimeError extends Error {
  name: string = 'Runtime Error';

  constructor(public message: string) {
    super(message);
  }
}
