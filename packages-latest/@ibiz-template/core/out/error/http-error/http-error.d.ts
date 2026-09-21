import { AxiosResponse } from 'axios';
import { IApiHttpError, InputError } from '../../interface';
/**
 * @description 请求异常
 * @export
 * @class HttpError
 * @extends {Error}
 */
export declare class HttpError extends Error implements IApiHttpError {
    name: string;
    message: string;
    status: number;
    tag: string;
    response?: AxiosResponse;
    constructor(err: InputError);
}
//# sourceMappingURL=http-error.d.ts.map