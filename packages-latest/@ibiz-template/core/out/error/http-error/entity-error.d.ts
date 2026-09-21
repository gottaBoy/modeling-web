import { HttpError } from '../http-error/http-error';
import { detailMessage, InputError } from '../../interface';
/**
 * @description 请求异常
 * @export
 * @class EntityError
 * @extends {HttpError}
 */
export declare class EntityError extends HttpError {
    name: string;
    details: detailMessage[];
    constructor(err: InputError);
}
//# sourceMappingURL=entity-error.d.ts.map