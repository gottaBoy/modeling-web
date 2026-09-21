import { AxiosResponse } from 'axios';
type InputError = {
    message: string;
    response?: AxiosResponse;
};
/**
 * 请求异常
 *
 * @author chitanda
 * @date 2022-09-18 17:09:10
 * @export
 * @class HttpError
 * @implements {Error}
 */
export declare class HttpError extends Error {
    name: string;
    message: string;
    status: number;
    tag: string;
    response?: AxiosResponse;
    constructor(err: InputError);
}
export {};
//# sourceMappingURL=http-error.d.ts.map