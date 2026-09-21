/**
 * @description 运行时错误
 * @export
 * @class RuntimeError
 * @extends {Error}
 */
export class RuntimeError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'Runtime Error';
    }
}
